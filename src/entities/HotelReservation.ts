import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from "typeorm";
import Hotel from "@/entities/Hotel";
import User from "@/entities/User";
import Room from "@/entities/Room";

@Entity("hotelReservations")
export default class HotelReservation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  HotelId: number;

  @ManyToOne(() => Hotel, hotel => hotel.hotelReservations)
  hotel: Hotel;

  @Column()
  UserId: number;

  @OneToOne(() => User, user => user.hotelReservation)
  user: User;

  @Column()
  roomId: number;

  @ManyToOne(() => Room, room => room.hotelReservations)
  room: Room;
}
