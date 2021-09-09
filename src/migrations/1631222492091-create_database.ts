import { MigrationInterface, QueryRunner } from "typeorm";

export class createDatabase1631222492091 implements MigrationInterface {
    name = "createDatabase1631222492091"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"location\" DROP COLUMN \"name\"");
      await queryRunner.query("ALTER TABLE \"location\" ADD \"name\" character varying NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"location\" DROP COLUMN \"name\"");
      await queryRunner.query("ALTER TABLE \"location\" ADD \"name\" TIMESTAMP NOT NULL");
    }
}
