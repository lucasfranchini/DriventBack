import HotelReservation from "@/entities/HotelReservation";

export async function getReservation(userId: number) {
  const result =  await HotelReservation.findOne({ where: { userId } });
  const resultWithRoomAndHotel = await HotelReservation.getReservationByUserId(result.hotelId, result.userId, result.roomId);

  const reservation = {
    hotel: resultWithRoomAndHotel.hotel,
    room: resultWithRoomAndHotel.room,
    otherPeopleInRoom: resultWithRoomAndHotel.room.ocuppiedVacancies - 1
  };
  return reservation;
}
