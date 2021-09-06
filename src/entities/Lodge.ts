import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Booking from "./Booking";
import LodgeModality from "./LodgeModality";

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

  @OneToMany(
    () => LodgeModality,
    (lodgeModality: LodgeModality) => lodgeModality.lodge
  )
  lodgeModality: LodgeModality[];
}
