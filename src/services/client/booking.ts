import BookingData from "@/interfaces/booking";
import Booking from "@/entities/Booking";

export async function createNewBooking(bookingData: BookingData) {
  await Booking.createBooking(bookingData);
}
