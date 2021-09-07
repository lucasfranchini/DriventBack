import supertest from "supertest";
import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import {
  truncateTables,
  createBooking,
  createDataAndReturnToken,
} from "../factories/bookingFactory";
import Booking from "../../src/entities/Booking";

const agent = supertest(app);
const data = { id: 1, userId: 1, modalityId: 1, lodgeId: 1, value: 500 };

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await truncateTables();
});

afterAll(async () => {
  await clearDatabase();
  await truncateTables();
  await endConnection();
});

describe("GET /bookings", () => {
  it("should return the user's booking and 200 for valid params", async () => {
    const token = await createDataAndReturnToken();
    const data = { id: 1, userId: 1, modalityId: 1, lodgeId: 1, value: 500 };
    await createBooking(data);
    const usersBooking = await Booking.findOne({
      where: { id: 1 },
      relations: ["modality", "lodge"],
    });
    console.log(usersBooking);
    const response = await agent
      .get("/bookings")
      .set("authorization", `Bearer ${token}`);
    expect(response.body).toEqual(usersBooking);
    expect(response.status).toEqual(200);
  });

  it("should return 401 booking for invalid token", async () => {
    await createDataAndReturnToken();
    await createBooking(data);
    const response = await agent
      .get("/bookings")
      .set("authorization", "Bearer token_suspeito");
    expect(response.status).toEqual(401);
  });
});

describe("POST /bookings", () => {
  it("should create booking and return 201 for valid params", async () => {
    const token = createDataAndReturnToken();
    const body = { modalityId: 1, lodgeId: 1, value: 600 };
    const response = await agent
      .post("/bookings")
      .send(body)
      .set("authorization", `Bearer ${token}`);
    expect(response.status).toEqual(201);
  });
});
