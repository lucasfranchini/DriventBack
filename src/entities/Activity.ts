import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";
import Location from "./Location";
import Activity_User from "./Activity_User";

@Entity("activity")
export default class Activity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  title: string;

  @Column()
  start_hour: string;

  @Column()
  end_hour: string;

  @Column()
  remaining_seats: string;

  @ManyToOne(() => Location, {
    eager: true,
  })
  location: Location;

  @OneToMany(
    () => Activity_User,
    (activity_user: Activity_User) => activity_user.activity
  )
  activity: Activity_User;

  //   static async getDates() {}

  //   static async getActivity() {}

  //   static async updateActivity() {}

  //   static updateSeats() {}
}
