import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeBookingEntity1630823288482 implements MigrationInterface {
    name = "ChangeBookingEntity1630823288482"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP COLUMN \"isConfirmed\"");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" ADD \"isConfirmed\" boolean NOT NULL");
    }
}
