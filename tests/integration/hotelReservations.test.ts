import supertest from "supertest";
import httpStatus from "http-status";
import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { CreateSession } from "../factories/userFactory";
import { createHotel } from "../factories/hotelFactory";
import { ReserveHotelRoom } from "../../src/services/client/hotelReservation";
import Room from "../../src/entities/Room";
import { createBooking, createData } from "../factories/bookingFactory";
import Hotel from "../../src/entities/Hotel";
import User from "../../src/entities/User";

const agent =  supertest(app);
let userData: {
  token: string;
  user: User;
};

jest.mock("../../src/controllers/client/hotel");
const mockReserveHotelRoom = ReserveHotelRoom as jest.MockedFunction<typeof ReserveHotelRoom>;
let hotel: Hotel;
let data: {
  token: string;
  modalityIds: number[];
  lodgeIds: number[];
};

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
  userData = await CreateSession();
  data = await createData();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /reservation/:id", () => {
  beforeEach(async () => {
    await createBooking({ modalityId: data.modalityIds[0], lodgeId: data.lodgeIds[0], userId: userData.user.id, value: 500 });
    hotel = await createHotel();
    mockReserveHotelRoom(hotel.id, hotel.rooms[0].id, userData.user.id);
  });

  it("should return status 200 and reservation object", async () => {
    const response = await agent.get(`/hotelReservations/${userData.user.id}`).set("authorization", `Bearer ${userData.token}`);
    expect(response.statusCode).toEqual(httpStatus.OK);
    expect(response.body).toEqual(expect.objectContaining({
      hotel: expect.objectContaining({
        id: expect.any(Number),
        image: expect.any(String),
        name: expect.any(String)
      }),
      room: expect.objectContaining({
        id: expect.any(Number),
        hotelId: expect.any(Number),
        number: expect.any(String),
        ocuppiedVacancies: expect.any(Number),
        roomVacancies: expect.any(Number)
      }),
      otherPeopleInRoom: expect.any(Number),
      roomType: expect.any(String)
    }));
  });
});

describe("POST /hotelReservations/hotels/:hotelId/rooms/:roomId", () => {
  beforeEach(async () => {
    hotel = await createHotel();
  });

  it("should return status 201 for valid params", async () => {
    await createBooking({ modalityId: data.modalityIds[0], lodgeId: data.lodgeIds[0], userId: userData.user.id, value: 500 });
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${userData.token}`);
    expect(response.statusCode).toBe(httpStatus.CREATED);
  });
  it("should update room reservation if user already has reservation", async () => {
    await createBooking({ modalityId: data.modalityIds[0], lodgeId: data.lodgeIds[0], userId: userData.user.id, value: 500 });
    mockReserveHotelRoom(hotel.id, hotel.rooms[0].id, userData.user.id);
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${hotel.rooms[1].id}`).send({}).set("authorization", `Bearer ${userData.token}`);
    expect(response.statusCode).toBe(httpStatus.CREATED);
  });
  it("should incremente ocuppiedVacencies in selected room for valid params", async () => {
    await createBooking({ modalityId: data.modalityIds[0], lodgeId: data.lodgeIds[0], userId: userData.user.id, value: 500 });
    const oldVacancies = hotel.rooms[0].ocuppiedVacancies;
    await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${userData.token}`);
    const room = await Room.findOne(hotel.rooms[0].id);
    expect(oldVacancies).toBe(room.ocuppiedVacancies -1);
  });
  it("should return status 401 for 'Sem Hotel' lodge", async () => {
    await createBooking({ modalityId: data.modalityIds[0], lodgeId: data.lodgeIds[1], userId: userData.user.id, value: 500 });
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${userData.token}`);
    expect(response.statusCode).toBe(httpStatus.UNAUTHORIZED);
  });
  it("should return status 409 for full room", async () => {
    await createBooking({ modalityId: data.modalityIds[0], lodgeId: data.lodgeIds[0], userId: userData.user.id, value: 500 });
    const room = hotel.rooms.find(r => r.ocuppiedVacancies === r.roomVacancies);
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${room.id}`).send({}).set("authorization", `Bearer ${userData.token}`);
    expect(response.statusCode).toBe(httpStatus.CONFLICT);
  });
  it("should return status 404 for invalid hotelId", async () => {
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id+1}/rooms/${hotel.rooms[0].id}`).send({}).set("authorization", `Bearer ${userData.token}`);
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });

  it("should return status 404 for invalid roomId", async () => {
    const room = hotel.rooms[hotel.rooms.length-1];
    const response = await agent.post(`/hotelReservations/hotels/${hotel.id}/rooms/${room.id+1}`).send({}).set("authorization", `Bearer ${userData.token}`);
    expect(response.statusCode).toBe(httpStatus.NOT_FOUND);
  });
});
