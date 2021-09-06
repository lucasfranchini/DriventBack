import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import Modality from "./Modality";
import Lodge from "./Lodge";

@Entity("lodges_modalities")
export default class LodgeModality extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lodgeId: number;

  @Column()
  modalityId: number;

  @ManyToOne(() => Modality, (modality) => modality.lodgeModality)
  modality: Modality;

  @ManyToOne(() => Lodge, (lodge) => lodge.lodgeModality)
  lodge: Lodge;
}
