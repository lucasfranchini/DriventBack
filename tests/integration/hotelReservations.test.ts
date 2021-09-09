import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { CreateSession } from "../factories/userFactory";
import { createHotel } from "../factories/hotelFactory";
import Room from "../../src/entities/Room";
import { createBooking, createDataAndReturnToken } from "../factories/bookingFactory";
import  Session  from "../../src/entities/Session";
import  User  from "../../src/entities/User";

const agent =  supertest(app);
let userData: {
  session: Session;
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

describe("POST /hotelReservations/hotels/:hotelId/rooms/:roomId", () => {
  let data: {
    token: string;
    modalityIds: number[];
    lodgeIds: number[];
  };
  beforeEach(async () => {
    data = await createDataAndReturnToken();
  });
  it("should return status 201 for valid params", async () => {
    await createBooking({ modalityId: data.modalityIds[0], lodgeId: data.lodgeIds[0], userId: userData.user.id, value: 500 });
    const hotel = await createHotel();
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${userData.session.token}`);
    expect(response.statusCode).toBe(httpStatus.CREATED);
  });
  it("should incremente ocuppiedVacencies in selected room for valid params", async () => {
    await createBooking({ modalityId: data.modalityIds[0], lodgeId: data.lodgeIds[0], userId: userData.user.id, value: 500 });
    const hotel = await createHotel();
    const oldVacancies = hotel.rooms[0].ocuppiedVacancies;
    await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${userData.session.token}`);
    const room = await Room.findOne(hotel.rooms[0].id);
    expect(oldVacancies).toBe(room.ocuppiedVacancies -1);
  });
  it("should return status 401 for 'Sem Hotel' lodge", async () => {
    await createBooking({ modalityId: data.modalityIds[0], lodgeId: data.lodgeIds[1], userId: userData.user.id, value: 500 });
    const hotel = await createHotel();
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${userData.session.token}`);
    expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return status 409 for full room", async () => {
    await createBooking({ modalityId: data.modalityIds[0], lodgeId: data.lodgeIds[0], userId: userData.user.id, value: 500 });
    const hotel = await createHotel();
    const room = hotel.rooms.find(r => r.ocuppiedVacancies === r.roomVacancies);
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${room.id}`).send({}).set("authorization", `Bearer ${userData.session.token}`);
    expect(response.statusCode).toBe(httpStatus.CONFLICT);
  });
  it("should return status 404 for invalid hotelId", async () => {
    const hotel = await createHotel();
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id+1}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${userData.session.token}`);
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });

  it("should return status 404 for invalid roomId", async () => {
    const hotel = await createHotel();
    const room = hotel.rooms[hotel.rooms.length-1];
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${room.id+1}`).send({}).set("authorization", `Bearer ${userData.session.token}`);
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });
});
