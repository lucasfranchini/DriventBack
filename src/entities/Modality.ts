import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";

@Entity("modalities")
export default class Modality extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column()
  price: number;
}
