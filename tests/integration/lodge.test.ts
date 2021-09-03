import supertest from "supertest";
import app, { init } from "../../src/app";
import { createLodge, truncateLodgeTable } from "../factories/lodgeFactory";
import { clearDatabase, endConnection } from "../utils/database";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await truncateLodgeTable();
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /lodges", () => {
  it("should return the lodges options", async () => {
    await createLodge();
    const response = await agent.get("/lodges");
    expect(response.body[0]).toEqual({
      id: 1, 
      type: "Com Hotel",
      price: 250,
    });
  });

  it("should return status 204 for no lodges options in database", async () => {
    const response = await agent.get("/lodges");
    expect(response.status).toEqual(204);
  });
});
