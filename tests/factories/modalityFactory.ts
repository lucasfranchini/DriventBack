import Modality from "../../src/entities/Modality";
import { getConnection } from "typeorm";

export async function createModality() {
  const modalityOption = Modality.create({
    type: "Online",
    price: 100,
  });
  await modalityOption.save();
  return modalityOption;
}

export async function truncateModalitiesTable() {
  const connection = getConnection();
  await connection.query(
    "TRUNCATE bookings, lodges_modalities, modalities RESTART IDENTITY"
  );
}
