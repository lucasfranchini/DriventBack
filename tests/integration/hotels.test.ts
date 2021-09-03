import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import Session from "../../src/entities/Session";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { CreateSession } from "../factories/userFactory";
import { createHotel } from "../factories/hotelFactory";

const agent =  supertest(app);
let session: Session; 
beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
  session = await CreateSession();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /hotels", () => {
  it("should return status 401 for invalid Token", async () => {
    const response = await agent.get("/hotels").set("authorization", "lalala");
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
  it("should return an array with all hotels for valid token", async () => {
    const hotel = await createHotel();
    const response = await agent.get("/hotels").set("authorization", `Bearer ${session.token}`);

    expect(response.body).toEqual(expect.arrayContaining([{
      ...hotel,
      totalvacancies: expect.any(Number),
      allRoomsTypes: expect.any(Array)
    }]));
  });
  it("should return status 200 for valid token", async () => {
    await createHotel();
    const response = await agent.get("/hotels").set("authorization", `Bearer ${session.token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });
});
