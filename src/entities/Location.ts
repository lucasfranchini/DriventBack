import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from "typeorm";
import Activity from "./Activity";

@Entity("location")
export default class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: Date;

  @OneToMany(() => Activity, (activity: Activity) => activity.location, {
    eager: true,
  })
  activity: Activity[];
}
