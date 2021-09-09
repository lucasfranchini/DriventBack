import { MigrationInterface, QueryRunner } from "typeorm";

export class chengeHotelReservationsColumns1631073689529 implements MigrationInterface {
    name = "chengeHotelReservationsColumns1631073689529"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotelReservations\" DROP COLUMN \"HotelId\"");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" DROP COLUMN \"UserId\"");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ADD \"userId\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" DROP CONSTRAINT \"FK_73de85617721e29a96f5e50af5b\"");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ALTER COLUMN \"hotelId\" SET NOT NULL");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ADD CONSTRAINT \"FK_73de85617721e29a96f5e50af5b\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"hotelReservations\" DROP CONSTRAINT \"FK_73de85617721e29a96f5e50af5b\"");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ALTER COLUMN \"hotelId\" DROP NOT NULL");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ADD CONSTRAINT \"FK_73de85617721e29a96f5e50af5b\" FOREIGN KEY (\"hotelId\") REFERENCES \"hotels\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" DROP COLUMN \"userId\"");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ADD \"UserId\" integer NOT NULL");
      await queryRunner.query("ALTER TABLE \"hotelReservations\" ADD \"HotelId\" integer NOT NULL");
    }
}
