import { MigrationInterface, QueryRunner } from "typeorm";

export class changeRoomVariableOcuupiedVanciesName1630964260235 implements MigrationInterface {
    name = "changeRoomVariableOcuupiedVanciesName1630964260235"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" RENAME COLUMN \"ocuppiedVancies\" TO \"ocuppiedVacancies\"");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"rooms\" RENAME COLUMN \"ocuppiedVacancies\" TO \"ocuppiedVancies\"");
    }
}
