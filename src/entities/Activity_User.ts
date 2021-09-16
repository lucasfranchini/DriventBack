import { BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import Activity from "./Activity";
import User from "./User";

@Entity("activities_user")
export default class Activity_User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Activity, (activity: Activity) => activity.activities)
  activities: Activity;

  @ManyToOne(() => User, (user: User) => user.activity)
  user: User;

  @Column()
  activitiesId: number;

  @Column()
  userId: number;

  static async getUsersActivities(userId: number) {
    const activities = await this.find({ where: { userId } });
    return activities;
  }
}
