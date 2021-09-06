import BookingData from "@/interfaces/booking";
import Booking from "@/entities/Booking";

export async function createNewBooking(bookingData: BookingData) {
  await Booking.createBooking(bookingData);
}

export async function getUserBooking(userId: number) {
  const booking = await Booking.findOne({ where: { userId } });
  if (!booking) return false;
  return booking;
}
