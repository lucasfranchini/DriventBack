import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Booking from "./Booking";
import LodgeModality from "./LodgeModality";

@Entity("modalities")
export default class Modality extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  price: number;

  @OneToMany(() => Booking, (booking: Booking) => booking.modality)
  booking: Booking[];

  @OneToMany(
    () => LodgeModality,
    (lodgeModality: LodgeModality) => lodgeModality.modality
  )
  lodgeModality: LodgeModality[];
}
