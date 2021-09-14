import Hotel from "@/entities/Hotel";
import NotFoundError from "@/errors/NotFoundError";
import HotelInfo from "@/interfaces/hotelInfo";

export async function get() {
  const hotels: HotelInfo[] = await Hotel.getManyWithRoomsOrdered();
  hotels.forEach(hotel => {
    hotel.totalvacancies = hotel.totalVacancies();
    hotel.allRoomsTypes = hotel.roomsTypes();
  });
  return hotels;
}

export async function getOne(id: number) {
  const hotel  = await Hotel.getOneWithRoomsOrdered(id);
  if(hotel===undefined) {
    throw new NotFoundError();
  }
  return hotel;
}
