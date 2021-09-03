import Hotel from "@/entities/Hotel";
import HotelInfo from "@/interfaces/hotelInfo";

export async function get() {
  const hotels: HotelInfo[] = await Hotel.find();
  hotels.forEach(hotel => {
    hotel.totalvacancies = hotel.totalVacancies();
    hotel.allRoomsTypes = hotel.roomsTypes();
  });
  return hotels;
}
