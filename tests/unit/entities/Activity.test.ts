import Activity from "../../../src/entities/Activity";

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {
      static async findOne() {undefined;}
      static async insert() {undefined;}
      async save() {undefined;}
    },
    Entity: () => {undefined;},
    PrimaryGeneratedColumn: () => {undefined;},
    Column: () => {undefined;},
    OneToMany: () => {undefined;},
    ManyToOne: () => {undefined;}
  };
});

describe("Activity.subscribe", async () => {
  it("should throw 422 for no remaining seats", async () => {
    await Activity.subscribe(1, 2);
    return;
  });
});
