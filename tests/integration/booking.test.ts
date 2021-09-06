import supertest from "supertest";
import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import {
  truncateTables,
  createBooking,
  createDataAndReturnToken,
} from "../factories/bookingFactory";

const agent = supertest(app);

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
  it("should return the user's booking for valid params", async () => {
    const token = await createDataAndReturnToken();
    const data = { id: 1, userId: 1, modalityId: 1, lodgeId: 1, value: 500 };
    await createBooking(data);

    const response = await agent
      .get("/bookings")
      .set("authorization", `Bearer ${token}`);
    console.log(response.body);
    expect(response.body).toEqual(data);
  });
});
