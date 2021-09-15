/* eslint-disable @typescript-eslint/no-empty-function */
import { promisify } from "util";
import User from "../../src/entities/User";
import  client  from "../../src/redisClient";

afterAll(async () => {
  const quitAsync = promisify(client.quit).bind(client);
  await quitAsync();
});

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {
      static async findOne() {}
    },
    Entity: () => {},
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    OneToMany: () => {},
    OneToOne: () => {},
    ManyToOne: () => {}
  };
});

describe("User.verifyEmail", () => {
  it("throws an error for invalid email", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce(null);
    const result = () => User.verifyEmail("email");
    await expect(result).rejects.toThrow(Error);
  });
  it("returns an object for valid Email", async () => {
    jest.spyOn(User, "findOne").mockResolvedValueOnce({} as User);
    const result = await User.verifyEmail("email");
    expect(result).toMatchObject({});
  });
});

