import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import Hotel from "@/entities/Hotel";
import HotelReservation from "@/entities/HotelReservation";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  roomVacancies: number;

  @Column()
  ocuppiedVacancies: number;

  @Column()
  hotelId: number;

  @ManyToOne(() => Hotel, hotel => hotel.rooms)
  hotel: Hotel;

  @OneToMany(() => HotelReservation, hotelReservations => hotelReservations.hotel)
  hotelReservations: HotelReservation[];

  async incrementOcuppiedVacancies() {
    this.ocuppiedVacancies++;
    await this.save();
  }

  freeVacancies() {
    return this.roomVacancies - this.ocuppiedVacancies;
  }

  type() {
    if(this.roomVacancies ===1) {
      return "single";
    }
    if(this.roomVacancies ===2) {
      return "double";
    }
    return "triple";
  }
}
