import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity("lodges")
export default class Lodge extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  price: number;
}
