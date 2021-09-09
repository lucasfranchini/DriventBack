import HotelReservation from "@/entities/HotelReservation";

export async function getReservation(userId: number) {
  const result =  await HotelReservation.findOne({ where: { userId } });
  const resultWithRoomAndHotel = await HotelReservation.getReservationByUserId(result.hotelId, result.userId, result.roomId);

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
