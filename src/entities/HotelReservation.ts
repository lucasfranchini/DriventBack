import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import Hotel from "@/entities/Hotel";
import User from "@/entities/User";
import Room from "@/entities/Room";

@Entity("hotelReservations")
export default class HotelReservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  hotelId: number;

  @ManyToOne(() => Hotel, hotel => hotel.hotelReservations)
  hotel: Hotel;

  @Column()
  userId: number;

  @OneToOne(() => User, user => user.hotelReservation)
  user: User;

  @Column()
  roomId: number;

  @ManyToOne(() => Room, room => room.hotelReservations)
  room: Room;

  static async getReservationByUserId(hotelId: number, userId: number, roomId: number) {
    return await this.createQueryBuilder("hotelReservation")
      .leftJoinAndSelect("hotelReservation.hotel", "hotel", "hotel.id = :hotelId", { hotelId })
      .leftJoinAndSelect("hotelReservation.room", "room", "room.id = :roomId", { roomId })
      .where("hotelReservation.userId = :userId", { userId })
      .getOne();
  }
}
