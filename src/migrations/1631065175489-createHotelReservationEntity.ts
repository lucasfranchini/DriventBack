import { MigrationInterface, QueryRunner } from "typeorm";

export class createHotelReservationEntity1631065175489 implements MigrationInterface {
    name = "createHotelReservationEntity1631065175489"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"hotelReservations\" (\"id\" SERIAL NOT NULL, \"HotelId\" integer NOT NULL, \"UserId\" integer NOT NULL, \"roomId\" integer NOT NULL, \"hotelId\" integer, CONSTRAINT \"PK_646057d2269a56170327277e921\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ADD CONSTRAINT \"FK_73de85617721e29a96f5e50af5b\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ADD CONSTRAINT \"FK_04df1c5acca6e0cbc0cec979b55\" FOREIGN KEY (\"roomId\") REFERENCES \"rooms\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotelReservations\" DROP CONSTRAINT \"FK_04df1c5acca6e0cbc0cec979b55\"");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" DROP CONSTRAINT \"FK_73de85617721e29a96f5e50af5b\"");
      await queryRunner.query("DROP TABLE \"hotelReservations\"");
    }
}

