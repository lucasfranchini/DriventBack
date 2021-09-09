import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateIsPaidColumn1631162720392 implements MigrationInterface {
    name = "CreateIsPaidColumn1631162720392"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" ADD \"isPaid\" boolean NOT NULL DEFAULT false");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"bookings\" DROP COLUMN \"isPaid\"");
    }
}
