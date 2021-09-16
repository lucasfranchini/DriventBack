import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatePictureColumn1631750430772 implements MigrationInterface {
    name = "CreatePictureColumn1631750430772"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"users\" ADD \"pictureUrl\" character varying");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"users\" DROP COLUMN \"pictureUrl\"");
    }
}
