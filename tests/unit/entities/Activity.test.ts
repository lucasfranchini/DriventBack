import Activity from "../../../src/entities/Activity";
import Activity_User from "../../../src/entities/Activity_User";
import UnprocessableEntity from "../../../src/errors/UnprocessableEntity";

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {
      static async findOne() {undefined;}
      static async insert() {undefined;}
      static async find() {undefined;}
      async save() {undefined;}
    },
    Entity: () => {undefined;},
    PrimaryGeneratedColumn: () => {undefined;},
    Column: () => {undefined;},
    OneToMany: () => {undefined;},
    ManyToOne: () => {undefined;},
    OneToOne: () => {undefined;}
  };
});

describe("Activity.subscribe", () => {
  it("should throw 422 for no remaining seats", async () => {
    jest.spyOn(Activity, "findOne").mockImplementationOnce(async () => ({ remaining_seats: 0 }) as Activity);
    const asyncFunction = () => Activity.subscribe(1, 1);
    await expect(asyncFunction).rejects.toThrow(UnprocessableEntity);
  });

  it("should throw 422 for already signed user", async () => {
    jest.spyOn(Activity_User, "findOne").mockImplementationOnce(async () => ({ }) as Activity);
    const asyncFunction = () => Activity.subscribe(1, 1);
    await expect(asyncFunction).rejects.toThrow(UnprocessableEntity);
  });

  it("should throw 422 for no existing activity", async () => {
    jest.spyOn(Activity_User, "findOne").mockImplementationOnce(async () => (undefined));
    const asyncFunction = () => Activity.subscribe(1, 1);
    await expect(asyncFunction).rejects.toThrow(UnprocessableEntity);
  });
});
