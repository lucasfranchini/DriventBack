import supertest from "supertest";

import app, { init } from "../../src/app";
import { clearDatabase, endConnection } from "../utils/database";
import { createBasicSettings } from "../utils/app";
import { createUser } from "../factories/userFactory";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import User from "../../src/entities/User";
import bcrypt  from "bcrypt";

const agent =  supertest(app);

beforeAll(async () => {
  await init();
});

beforeEach(async () => {
  await clearDatabase();
  await createBasicSettings();
});

afterAll(async () => {
  await clearDatabase();
  await endConnection();
});

describe("POST /resetPassword/:token", () => {
  it("should change user Password for valid params", async () => {
    const user = await createUser();
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: 60*60 });
    const response = await agent.post(`/resetPassword/${token}`).send({ newPassword: "12345" });
    const actualUser = await User.findOne(user.id);
    const passwordResult = bcrypt.compareSync("12345", actualUser.password);
    expect(response.statusCode).toBe(200);
    expect(passwordResult).toBe(true);
  });
  it("should answer with status 400 for invalid token", async () => {
    const token = "a";
    const response = await agent.post(`/resetPassword/${token}`).send({ newPassword: "12345" });
    expect(response.statusCode).toBe(httpStatus.BAD_REQUEST);
  });
});
