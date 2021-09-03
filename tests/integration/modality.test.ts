import supertest from "supertest";
import app, { init } from "../../src/app";
import { createModality, truncateModalitiesTable } from "../factories/modalityFactory";
import { clearDatabase, endConnection } from "../utils/database";

const agent = supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await truncateModalitiesTable();
  await clearDatabase();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("GET /modalities", () => {
  it("should return the modalities options", async () => {
    await createModality();
    const response = await agent.get("/modalities");
    expect(response.body[0]).toEqual({
      id: 1, 
      type: "Online",
      price: 100
    });
  });

  it("should return status 204 for no modalities options in database", async () => {
    const response = await agent.get("/modalities");
    expect(response.status).toEqual(204);
  });
});
