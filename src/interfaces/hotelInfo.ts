import Hotel from "@/entities/Hotel";

interface HotelInfo extends Hotel{
  totalvacancies?: number;
  allRoomsTypes?: {single: boolean; double: boolean; triple: boolean};
}

export default HotelInfo;
