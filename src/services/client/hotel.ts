import Hotel from "@/entities/Hotel";
import HotelReservation from "@/entities/HotelReservation";
import ConflictError from "@/errors/ConflictError";
import NotFoundError from "@/errors/NotFoundError";
import HotelInfo from "@/interfaces/hotelInfo";

export async function get() {
  const hotels: HotelInfo[] = await Hotel.find();
  hotels.forEach(hotel => {
    hotel.totalvacancies = hotel.totalVacancies();
    hotel.allRoomsTypes = hotel.roomsTypes();
  });
  return hotels;
}

export async function getOne(id: number) {
  const hotel  = await Hotel.getRoomsOrdered(id);
  if(hotel===undefined) {
    throw new NotFoundError();
  }
  return hotel;
}

export async function ReserveHotelRoom(hotelId: number, roomId: number, userId: number) {
  const hotel = await Hotel.getWithSpecifiedRoomAndSpecifiedReservation(hotelId, roomId, userId);
  if(!hotel || hotel.rooms.length === 0) throw new NotFoundError();
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
