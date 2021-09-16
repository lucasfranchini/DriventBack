import { getConnection } from "typeorm";
import { CreateSession } from "../factories/userFactory";
import Modality from "../../src/entities/Modality";
import Lodge from "../../src/entities/Lodge";
import Booking from "../../src/entities/Booking";
import BookingData from "../../src/interfaces/booking";

export async function truncateBookingTable() {
  const connection = getConnection();
  await connection.query("TRUNCATE bookings RESTART IDENTITY CASCADE");
}

export async function truncateTables() {
  const connection = getConnection();
  await connection.query(
    "TRUNCATE bookings, sessions, users, modalities, lodges RESTART IDENTITY CASCADE"
  );
}

export async function createData() {
  const session =  await CreateSession();
  const modalityResult = await Modality.insert([
    { type: "Presencial", price: 250 },
    { type: "Online", price: 100 },
  ]);
  const lodgeResult = await Lodge.insert([
    {
      type: "Com Hotel",
      price: 250,
    },
    { type: "Sem Hotel", price: 0 },
  ]);
  return {
    token: session.token,
    modalityIds: (modalityResult.identifiers as unknown[]) as number[],
    lodgeIds: (lodgeResult.identifiers as unknown[]) as number[]
  };
}

export async function createBooking(data: BookingData) {
  const { lodgeId, modalityId, userId, value } = data;
  const booking = Booking.create({
    lodgeId,
    modalityId,
    value,
    userId,
  });
  await booking.save();
  return booking;
}
