/* eslint-disable @typescript-eslint/no-empty-function */
import { promisify } from "util";
import User from "../../src/entities/User";
import  client  from "../../src/redis";

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
    ManyToOne: () => {}
  };
});

describe()
