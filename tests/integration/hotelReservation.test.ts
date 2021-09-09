import supertest from "supertest";
import httpStatus from "http-status";

import app, { init } from "../../src/app";
import Session from "../../src/entities/Session";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { CreateSession } from "../factories/userFactory";
import { ReserveHotelRoom } from "../../src/services/client/hotel";
import { createHotel, createRoom } from "../factories/hotelFactory";
import Hotel from "../../src/entities/Hotel";
import Room from "../../src/entities/Room";

const agent =  supertest(app);
let session: Session;
jest.mock("../../src/controllers/client/hotel");
const mockReserveHotelRoom = ReserveHotelRoom as jest.MockedFunction<typeof ReserveHotelRoom>;
let hotel: Hotel;
let room: Room;
beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
  session = await CreateSession();
  hotel = await createHotel();
  room = await createRoom(hotel.id, "101", 3, 1);
  mockReserveHotelRoom(hotel.id, room.id, session.userId);
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /reservation/:id", () => {
  it("should return status 200 and reservation object", async () => {
    const response = await agent.get(`/reservation/${session.userId}`);
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
