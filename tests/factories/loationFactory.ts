import Location from "../../src/entities/Location";
import faker from "faker";

export async function createLocation(quantity: number) {
  const locationArray = [];

  for (let i = 0; i < quantity; i++) {
    const name = faker.name.title();
    const result = Location.create({ name: name });

    const newResult = await result.save();

    locationArray.push(newResult);
  }
  return locationArray;
}
