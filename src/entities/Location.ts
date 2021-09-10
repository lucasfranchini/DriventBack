import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import Activity from "./Activity";

@Entity("locations")
export default class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
