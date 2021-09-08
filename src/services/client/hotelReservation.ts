import ConflictError from "@/errors/ConflictError";
import HotelReservation from "@/entities/HotelReservation";
import Hotel from "@/entities/Hotel";

export async function ReserveHotelRoom(hotelId: number, roomId: number, userId: number) {
  const hotel = await Hotel.getWithSpecifiedRoomAndSpecifiedReservation(hotelId, roomId, userId);
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
