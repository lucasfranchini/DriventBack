import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTypeAndTicketEntity1630560678107 implements MigrationInterface {
    name = "CreateTypeAndTicketEntity1630560678107"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"UQ_2e86eac7faf971f2dca1f87ace9\" UNIQUE (\"typeId\")");
      await queryRunner.query("ALTER TABLE \"tickets\" ADD CONSTRAINT \"FK_2e86eac7faf971f2dca1f87ace9\" FOREIGN KEY (\"typeId\") REFERENCES \"types\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"FK_2e86eac7faf971f2dca1f87ace9\"");
      await queryRunner.query("ALTER TABLE \"tickets\" DROP CONSTRAINT \"UQ_2e86eac7faf971f2dca1f87ace9\"");
    }
}
