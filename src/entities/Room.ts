import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import Hotel from "./Hotel";

@Entity("rooms")
export default class Room extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  number: string;

  @Column()
  roomVacancies: number;

  @Column()
  ocuppiedVancies: number;

  @Column()
  hotelId: number;

  @ManyToOne(() => Hotel, hotel => hotel.rooms)
  hotel: Hotel;

  freeVacancies() {
    return this.roomVacancies - this.ocuppiedVancies;
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
