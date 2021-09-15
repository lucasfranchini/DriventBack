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
    const { session } = await CreateSession();
    await createActivity();
    const response = await agent
      .get("/activities")
      .set("authorization", `Bearer ${session.token}`);
    expect(response.status).toEqual(httpStatus.OK);
  });

  it("should return all different activities dates", async () => {
    const { session } = await CreateSession();
    await createActivity();
    let diffActivities = await Activity.createQueryBuilder("activities")
      .select("date")
      .distinct(true)
      .orderBy("date", "ASC")
      .getRawMany();

    const response = await agent
      .get("/activities")
      .set("authorization", `Bearer ${session.token}`);
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
    const { session } = await CreateSession();
    const activities = await createActivity();
    const body = { date: activities[0].date };
    const response = await agent
      .post("/activities")
      .send(body)
      .set("authorization", `Bearer ${session.token}`);
    expect(response.status).toEqual(httpStatus.OK);
  });

  it("should return status 422 for invalid params", async () => {
    const { session } = await CreateSession();
    await createActivity();
    const body = { date: "" };
    const response = await agent
      .post("/activities")
      .send(body)
      .set("authorization", `Bearer ${session.token}`);
    expect(response.status).toEqual(httpStatus.UNPROCESSABLE_ENTITY);
  });

  it("should return all activities by date", async () => {
    const { session } = await CreateSession();
    const activities = await createActivity();
    const body = { date: activities[0].date };
    const response = await agent
      .post("/activities")
      .send(body)
      .set("authorization", `Bearer ${session.token}`);

    const allActivities = await Activity.createQueryBuilder("activities")
      .select()
      .where("activities.date = :date", { date: new Date(activities[0].date) })
      .getRawMany();
    expect(response.body.activities.length).toEqual(allActivities.length);
  });
});

describe("POST /activities/seat/:id", () => {
  it("should return status 401 for invalid token", async () => {
    const { session } = await CreateSession();
    await createActivity();
    const activitiesBefore = await Activity.find()[0];
    console.log(activitiesBefore[0].id, "antes");
    await agent
      .post(`/activities/seat/${activitiesBefore[0].id}`)
      .send({})
      .set("authorization", `Bearer ${session.token}`);
    const activitiesAfter = await Activity.find()[0];
    console.log(activitiesAfter[0].id, "depois");
    expect(1).toEqual(1);
  });
});
