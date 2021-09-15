import supertest from "supertest";
import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import {
  truncateTables,
  createBooking,
  createData,
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
  await truncateTables();
  await clearDatabase();
  await endConnection();
});

describe("GET /bookings", () => {
  it("should return the user's booking and 200 for valid params", async () => {
    const data = (await createData());
    const body = { id: 1, userId: 1, modalityId: 1, lodgeId: 1, value: 500 };
    await createBooking(body);
    const usersBooking = await Booking.findOne({
      where: { id: 1 },
      relations: ["modality", "lodge"],
    });
    const response = await agent
      .get("/bookings")
      .set("authorization", `Bearer ${data.token}`);
    expect(response.body).toEqual({ id: usersBooking.id, value: usersBooking.value, modality: usersBooking.modality, lodge: usersBooking.lodge, isPaid: usersBooking.isPaid } );
    expect(response.status).toEqual(200);
  });

  it("should return 401 booking for invalid token", async () => {
    await createData();
    await createBooking(data);
    const response = await agent
      .get("/bookings")
      .set("authorization", "Bearer token_suspeito");
    expect(response.status).toEqual(401);
  });
});

describe("POST /bookings", () => {
  it("should create booking and return 201 for valid params", async () => {
    const data = (await createData());
    const body = { modalityId: 1, lodgeId: 1, value: 600 };
    const response = await agent
      .post("/bookings")
      .send(body)
      .set("authorization", `Bearer ${data.token}`);
    const result = await Booking.find();
    expect (result.length).toEqual(1);  
    expect(response.status).toEqual(201);
  });

  it("should return 401 for invalid token", async () => {
    await createData();
    const body = { modalityId: 1, lodgeId: 1, value: 600 };
    const response = await agent
      .post("/bookings")
      .send(body)
      .set("authorization", "Bearer invalid_token");
    expect(response.status).toEqual(401);
  });

  it("should return 422 for invalid lodge", async () => {
    const data = (await createData());
    const body = { modalityId: 1, lodgeId: 8001, value: 600 };
    const response = await agent
      .post("/bookings")
      .send(body)
      .set("authorization", `Bearer ${data.token}`);
    expect(response.status).toEqual(422);
  });

  it("should return 422 for invalid modality", async () => {
    const data = (await createData());
    const body = { modalityId: 8001, lodgeId: 1, value: 600 };
    const response = await agent
      .post("/bookings")
      .send(body)
      .set("authorization", `Bearer ${data.token}`);
    expect(response.status).toEqual(422);
  });

  it("should return 409 for alreay registered user", async () => {
    const data = await createData();
    const body = { modalityId: 1, lodgeId: 1, value: 600 };
    await agent
      .post("/bookings")
      .send(body)
      .set("authorization", `Bearer ${data.token}`);
    const response = await agent
      .post("/bookings")
      .send(body)
      .set("authorization", `Bearer ${data.token}`);
    expect(response.status).toEqual(409);
  });
});

describe("PUT /bookings", () => {
  it("should return 201 for valid auth", async () => {
    const data = await createData();
    const body = { id: 1, userId: 1, modalityId: 1, lodgeId: 1, value: 500 };
    await createBooking(body);
    const response = await agent
      .put("/bookings")
      .set("authorization", `Bearer ${data.token}`);
    expect(response.status).toEqual(201);
  });

  it("should return 409 users that already paid", async () => {
    const data = await createData();
    const body = { id: 1, userId: 1, modalityId: 1, lodgeId: 1, value: 500 };
    const bookingBeingPaid = await createBooking(body);
    bookingBeingPaid.isPaid = true;
    bookingBeingPaid.save();
    const response = await agent
      .put("/bookings")
      .set("authorization", `Bearer ${data.token}`);
    expect(response.status).toEqual(409);
  });
});
