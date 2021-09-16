import ConflictError from "@/errors/ConflictError";
import HotelReservation from "@/entities/HotelReservation";
import Hotel from "@/entities/Hotel";
import Booking from "@/entities/Booking";
import InvalidBookingError from "@/errors/InvalidBooking";

export async function ReserveHotelRoom(hotelId: number, roomId: number, userId: number) {
  const hotel = await Hotel.getWithSpecifiedRoomAndSpecifiedReservation(hotelId, roomId, userId);
  const booking = await Booking.findOne({ where: { userId } });
  if(booking===undefined || booking.lodge.type === "Sem Hotel" || booking.lodgeId === null) throw new InvalidBookingError();
  if(hotel.rooms[0].freeVacancies() === 0) throw new ConflictError("room is full");
  const hotelReservation = hotel.hotelReservations[0];
  const newHotelReservation = HotelReservation.create({ hotelId, roomId, userId });
  if(hotelReservation!==undefined) {
    newHotelReservation.id=hotelReservation.id;
    await hotelReservation.room.decrementOcuppiedVacancies();
  }
  await newHotelReservation.save();
  await hotel.rooms[0].incrementOcuppiedVacancies();
}

export async function getReservation(userId: number) {
  const result =  await HotelReservation.findOne({ where: { userId } });
  const resultWithRoomAndHotel = await HotelReservation.getReservationByUserId(result?.hotelId, result?.userId, result?.roomId);

  let roomType;
  if(resultWithRoomAndHotel.room.roomVacancies === 3) {
    roomType = "Triple";
  } else if (resultWithRoomAndHotel.room.roomVacancies === 2) {
    roomType = "Double";
  } else {
    roomType = "Single";
  }

  const reservation = {
    hotel: resultWithRoomAndHotel.hotel,
    room: resultWithRoomAndHotel.room,
    roomType,
    otherPeopleInRoom: resultWithRoomAndHotel.room.ocuppiedVacancies - 1
  };
  return reservation;
}
