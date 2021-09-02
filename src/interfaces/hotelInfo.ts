import Hotel from "@/entities/Hotel";

interface HotelInfo extends Hotel{
  totalvacancies?: number;
  allRoomsTypes?: string[];
}

export default HotelInfo;
