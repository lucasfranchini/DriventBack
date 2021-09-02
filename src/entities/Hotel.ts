import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Room from "./Room";

@Entity("hotels")
export default class Hotel extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image: string;

  @OneToMany(() => Room, room => room.hotel, { eager: true })
  rooms: Room[];

  totalVacancies() {
    return this.rooms.reduce((acc, room) => {
      return acc + room.freeVacancies();
    }, 0);
  }

  roomsTypes() {
    const types = {
      single: false,
      double: false,
      triple: false
    };
    const arrayTypes: string[] = [];
    this.rooms.forEach(room => {
      types[room.type()] = true;
    });
    if(types.single) {
      arrayTypes.push("single");
    }
    if(types.double) {
      arrayTypes.push("double");
    }
    if(types.triple) {
      arrayTypes.push("triple");
    }
    return arrayTypes;
  }
}
