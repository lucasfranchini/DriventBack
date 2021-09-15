import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { CreateSession } from "../factories/userFactory";
import { createActivity } from "../factories/activityFactory";
import Activity from "../../src/entities/Activity";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /activities", () => {
  it("should return status 401 for invalid token", async () => {
    const response = await agent
      .get("/activities")
      .set("authorization", "Bearer lalala");
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return status 200", async () => {
    const { token } = await CreateSession();
    await createActivity();
    const response = await agent
      .get("/activities")
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toEqual(httpStatus.OK);
  });

  it("should return all different activities dates", async () => {
    const { token } = await CreateSession();
    await createActivity();
    let diffActivities = await Activity.createQueryBuilder("activities")
      .select("date")
      .distinct(true)
      .orderBy("date", "ASC")
      .getRawMany();

    const response = await agent
      .get("/activities")
      .set("authorization", `Bearer ${token}`);
    diffActivities = diffActivities.map(a => a.date);
    const result = (response.body).map((d: { date: string | number | Date; }) => d.date = new Date(d.date));

    expect(result).toEqual(diffActivities);
  });
});

describe("POST /activities", () => {
  it("should return status 401 for invalid token", async () => {
    const activities = await createActivity();
    const body = { date: activities[0].date };
    const response = await agent
      .post("/activities")
      .send(body)
      .set("authorization", "Bearer lalala");
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });

  it("should return status 200", async () => {
    const { token } = await CreateSession();
    const activities = await createActivity();
    const body = { date: activities[0].date };
    const response = await agent
      .post("/activities")
      .send(body)
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toEqual(httpStatus.OK);
  });

  it("should return status 422 for invalid params", async () => {
    const { token } = await CreateSession();
    await createActivity();
    const body = { date: "" };
    const response = await agent
      .post("/activities")
      .send(body)
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should return all activities by date", async () => {
    const { token } = await CreateSession();
    const activities = await createActivity();
    const body = { date: activities[0].date };
    const response = await agent
      .post("/activities")
      .send(body)
      .set("authorization", `Bearer ${token}`);

    const allActivities = await Activity.createQueryBuilder("activities")
      .select()
      .where("activities.date = :date", { date: new Date(activities[0].date) })
      .getRawMany();
    expect(response.body.activities.length).toEqual(allActivities.length);
  });
});

describe("POST /activities/seat", () => {
  it("should decrement remaining seats for correct params and auth", async () => {
    const { token } = await CreateSession();
    await createActivity();
    const activity = await Activity.findOne();
    await agent
      .post("/activities/seat")
      .send({ id: activity.id } )
      .set("authorization", `Bearer ${token}`);
    const activityAfter = await Activity.findOne({ where: { id: activity.id } });
    expect(activityAfter.remaining_seats).toEqual(activity.remaining_seats-1);
  });

  it("should return 401 for invalid auth", async () => {
    await createActivity();
    const activity = await Activity.findOne();
    const response = await agent
      .post("/activities/seat")
      .send({ id: activity.id })
      .set("authorization", "Bearer invalid_token");
    expect(response.status).toEqual(401);
  });
});
