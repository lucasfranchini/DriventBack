import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateBookingEntity1630813727373 implements MigrationInterface {
    name = "CreateBookingEntity1630813727373"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"bookings\" (\"id\" SERIAL NOT NULL, \"userId\" integer NOT NULL, \"value\" integer NOT NULL, \"modalityId\" integer NOT NULL, \"lodgeId\" integer, \"isConfirmed\" boolean NOT NULL, CONSTRAINT \"PK_bee6805982cc1e248e94ce94957\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_a8075028cd998d862e10edccd43\" FOREIGN KEY (\"modalityId\") REFERENCES \"modalities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"bookings\" ADD CONSTRAINT \"FK_f5e5928d899d30b8796624e0470\" FOREIGN KEY (\"lodgeId\") REFERENCES \"lodges\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_f5e5928d899d30b8796624e0470\"");
      await queryRunner.query("ALTER TABLE \"bookings\" DROP CONSTRAINT \"FK_a8075028cd998d862e10edccd43\"");
      await queryRunner.query("DROP TABLE \"bookings\"");
    }
}
