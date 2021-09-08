import HotelReservation from "@/entities/HotelReservation";

export async function getReservation(userId: string) {
  const reservation =  await HotelReservation.findOne({ where: { userId } });

  return reservation;
}
