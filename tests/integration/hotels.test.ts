import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import Session from "../../src/entities/Session";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { CreateSession } from "../factories/userFactory";
import { createHotel } from "../factories/hotelFactory";
import Room from "../../src/entities/Room";

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

describe("GET /hotels/:id", () => {
  it("should return status 401 for invalid Token", async () => {
    const response = await agent.get("/hotels/1").set("authorization", "lalala");
    expect(response.statusCode).toEqual(httpStatus.UNAUTHORIZED);
  });
  it("should return an array with all hotels for valid token", async () => {
    const hotel = await createHotel();
    const response = await agent.get(`/hotels/${hotel.id}`).set("authorization", `Bearer ${session.token}`);

    expect(response.body).toEqual(hotel);
  });
  it("should return status 200 for valid token", async () => {
    const hotel = await createHotel();
    const response = await agent.get(`/hotels/${hotel.id}`).set("authorization", `Bearer ${session.token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
  });
});

describe("POST /hotels/:hotelId/rooms/:roomId", () => {
  it("should return status 201 for valid params", async () => {
    const hotel = await createHotel();
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${session.token}`);
    expect(response.statusCode).toBe(httpStatus.CREATED);
  });
  it("should return status 409 for full room", async () => {
    const hotel = await createHotel();
    const room = hotel.rooms.find(r => r.ocuppiedVacancies === r.roomVacancies);
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${room.id}`).send({}).set("authorization", `Bearer ${session.token}`);
    expect(response.statusCode).toBe(httpStatus.CONFLICT);
  });
  it("should return status 404 for invalid hotelId", async () => {
    const hotel = await createHotel();
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id+1}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${session.token}`);
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });

  it("should return status 404 for invalid roomId", async () => {
    const hotel = await createHotel();
    const room = hotel.rooms[hotel.rooms.length-1];
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${room.id+1}`).send({}).set("authorization", `Bearer ${session.token}`);
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });
  it("should incremente ocuppiedVacencies in selected room for valid params", async () => {
    const hotel = await createHotel();
    const oldVacancies = hotel.rooms[0].ocuppiedVacancies;
    await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${session.token}`);
    const room = await Room.findOne(hotel.rooms[0].id);
    expect(oldVacancies).toBe(room.ocuppiedVacancies -1);
  });
});

