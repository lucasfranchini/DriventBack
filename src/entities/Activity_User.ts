import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Activity from "./Activity";
import User from "./User";

@Entity("activity_user")
export default class Activity_User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Activity, (activity: Activity) => activity.activity, {
    eager: true,
  })
  activity: Activity;

  @ManyToOne(() => User, (user: User) => user.activity, {
    eager: true,
  })
  user: User;
}
