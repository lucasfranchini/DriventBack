import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Booking from "./Booking";

@Entity("lodges")
export default class Lodge extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  price: number;

  @OneToMany(() => Booking, (booking: Booking) => booking.lodge)
  booking: Booking[];
}
