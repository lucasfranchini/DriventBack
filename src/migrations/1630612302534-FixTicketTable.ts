import { MigrationInterface, QueryRunner } from "typeorm";

export class FixTicketTable1630612302534 implements MigrationInterface {
    name = "FixTicketTable1630612302534"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP COLUMN \"price\"");
      await queryRunner.query("ALTER TABLE \"types\" ADD \"price\" integer NOT NULL");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"types\" DROP COLUMN \"price\"");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD \"price\" integer NOT NULL");
    }
}
