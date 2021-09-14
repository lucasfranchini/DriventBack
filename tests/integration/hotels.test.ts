import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { CreateSession } from "../factories/userFactory";
import { createHotel } from "../factories/hotelFactory";
import  User  from "../../src/entities/User";

const agent =  supertest(app);
let userData: {
  token: string;
  user: User;
}; 
beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
  userData = await CreateSession();
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
    const response = await agent.get("/hotels").set("authorization", `Bearer ${userData.token}`);

    expect(response.body).toEqual(expect.arrayContaining([{
      ...hotel,
      totalvacancies: expect.any(Number),
      allRoomsTypes: expect.any(Array)
    }]));
  });
  it("should return status 200 for valid token", async () => {
    await createHotel();
    const response = await agent.get("/hotels").set("authorization", `Bearer ${userData.token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });
});

describe("GET /hotels/:id", () => {
  it("should return status 401 for invalid Token", async () => {
    const response = await agent.get("/hotels/1").set("authorization", "lalala");
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
  it("should return an array with all hotels for valid token", async () => {
    const hotel = await createHotel();
    const response = await agent.get(`/hotels/${hotel.id}`).set("authorization", `Bearer ${userData.token}`);

    expect(response.body).toEqual(hotel);
  });
  it("should return status 200 for valid token", async () => {
    const hotel = await createHotel();
    const response = await agent.get(`/hotels/${hotel.id}`).set("authorization", `Bearer ${userData.token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });
});

