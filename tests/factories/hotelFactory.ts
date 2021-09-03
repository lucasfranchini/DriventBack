import Hotel from "../../src/entities/Hotel";
import Room from "../../src/entities/Room";

export async function createHotel() {
  const hotel = Hotel.create();
  hotel.name = "Driven World";
  hotel.image = "https://brasiltravelnews.com.br/wp-content/uploads/2020/12/image-2.jpg";
  await hotel.save();
  hotel.rooms = [];
  for(let i=0; i<15; i++) {
    const number = `1${i<10 ? "0"+i:i}`;
    const roomVacancies = (i%3)+1;
    const ocuppiedVancies =  i%2;
    const room = await createRoom(hotel.id, number, roomVacancies, ocuppiedVancies);
    hotel.rooms.push(room);
  }
  await hotel.save();
  return hotel;
}

export async function createRoom(hotelId: number, number: string, roomVacancies: number, ocuppiedVancies: number ) {
  const room = Room.create();
  room.hotelId =hotelId;
  room.number = number;
  room.roomVacancies = roomVacancies;
  room.ocuppiedVancies = ocuppiedVancies;
  await room.save();
  return room;
}
