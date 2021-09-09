import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import HotelReservation from "@/entities/HotelReservation";
import Room from "@/entities/Room";

import NotFoundError from "@/errors/NotFoundError";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Room, room => room.hotel, { eager: true })
  rooms: Room[];

  @OneToMany(() => HotelReservation, hotelReservations => hotelReservations.hotel)
  hotelReservations: HotelReservation[];

  static async getRoomsOrdered(id: number) {
    return await this.createQueryBuilder("hotel")
      .leftJoinAndSelect("hotel.rooms", "rooms")
      .where("hotel.id = :id", { id })
      .orderBy("rooms.id", "ASC")
      .getOne();
  }

  static async getWithSpecifiedRoomAndSpecifiedReservation(hotelId: number, roomId: number, userId: number) {
    const hotel =  await this.createQueryBuilder("hotel")
      .leftJoinAndSelect("hotel.rooms", "rooms", "rooms.id = :roomId", { roomId })
      .leftJoinAndSelect("hotel.hotelReservations", "hotelReservations", "hotelReservations.userId = :userId", { userId })
      .leftJoinAndSelect("hotelReservations.room", "reservationRoom")
      .where("hotel.id = :hotelId", { hotelId })
      .getOne();

    if(!hotel || hotel.rooms.length === 0) throw new NotFoundError();
    return hotel;
  }

  totalVacancies() {
    return this.rooms.reduce((acc, room) => {
      return acc + room.freeVacancies();
    }, 0);
  }

  roomsTypes() {
    const types = {
      single: false,
      double: false,
      triple: false
    };
    this.rooms.forEach(room => {
      types[room.type()] = true;
    });
    const arrayTypes: string[] = [];
    Object.entries(types).forEach((e) => {
      if(e[1]) arrayTypes.push(e[0]);
    });
    return arrayTypes;
  }
}
