/* eslint-disable @typescript-eslint/no-empty-function */
import Enrollment from "../../src/entities/Enrollment";
import EnrollmentData from "../../src/interfaces/enrollment";

jest.mock("typeorm", () => {
  return {
    BaseEntity: class MockedBaseEntity {
      static async save() {}
      static async findOne() {}
      static async create() {}
    },
    Entity: () => {},
    PrimaryGeneratedColumn: () => {},
    Column: () => {},
    JoinColumn: () => {},
    OneToOne: () => {}
  };
});

describe("createOrUpdate", () => {
  it("should call the save method from baseEntity", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    jest.spyOn(Enrollment, "populateFromData").mockImplementation(() => null);
    const spy = jest.spyOn(Enrollment, "save").mockImplementationOnce(() => null);
    await Enrollment.createOrUpdate({} as EnrollmentData);

    await expect(spy).toHaveBeenCalled();
  });
});
