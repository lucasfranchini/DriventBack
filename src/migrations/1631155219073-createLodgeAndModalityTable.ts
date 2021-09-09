import { MigrationInterface, QueryRunner } from "typeorm";

export class createLodgeAndModalityTable1631155219073 implements MigrationInterface {
    name = "createLodgeAndModalityTable1631155219073"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"lodges\" (\"id\" SERIAL NOT NULL, \"type\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"PK_ec5718f079ccec3cf11e1e13615\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("CREATE TABLE \"modalities\" (\"id\" SERIAL NOT NULL, \"type\" character varying NOT NULL, \"price\" integer NOT NULL, CONSTRAINT \"PK_4135bf3c2e5bb971c20b08bbef1\" PRIMARY KEY (\"id\"))");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("DROP TABLE \"modalities\"");
      await queryRunner.query("DROP TABLE \"lodges\"");
    }
}
