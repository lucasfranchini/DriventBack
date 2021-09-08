import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import HotelReservation from "@/entities/HotelReservation";
import Room from "@/entities/Room";

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

  static async getWithSpecifiedRoom(hotelId: number, roomId: number) {
    return await this.createQueryBuilder("hotel")
      .leftJoinAndSelect("hotel.rooms", "rooms", "rooms.id = :roomId", { roomId })
      .where("hotel.id = :hotelId", { hotelId })
      .getOne();
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
