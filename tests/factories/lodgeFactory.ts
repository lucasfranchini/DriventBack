import Lodge from "../../src/entities/Lodge";
import { getConnection } from "typeorm";

export async function createLodge() {
  const lodgeOption = Lodge.create({
    type: "Com Hotel",
    price: 250,
  });
  await lodgeOption.save();
  return lodgeOption;
}

export async function truncateLodgeTable() {
  const connection = getConnection();
  await connection.query(
    "TRUNCATE bookings, lodges RESTART IDENTITY"
  );
}
