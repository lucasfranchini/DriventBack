import { MigrationInterface, QueryRunner } from "typeorm";

export class createLodgesModalitiesTable1630874501403 implements MigrationInterface {
    name = "createLodgesModalitiesTable1630874501403"

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("CREATE TABLE \"lodges_modalities\" (\"id\" SERIAL NOT NULL, \"lodgeId\" integer NOT NULL, \"modalityId\" integer NOT NULL, CONSTRAINT \"PK_a169f853da56cdf32677321f279\" PRIMARY KEY (\"id\"))");
      await queryRunner.query("ALTER TABLE \"lodges_modalities\" ADD CONSTRAINT \"FK_02b5b2f20c18b2dd3aadcdce401\" FOREIGN KEY (\"modalityId\") REFERENCES \"modalities\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
      await queryRunner.query("ALTER TABLE \"lodges_modalities\" ADD CONSTRAINT \"FK_bfa541cb4fc07515a3f3cc5960f\" FOREIGN KEY (\"lodgeId\") REFERENCES \"lodges\"(\"id\") ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query("ALTER TABLE \"lodges_modalities\" DROP CONSTRAINT \"FK_bfa541cb4fc07515a3f3cc5960f\"");
      await queryRunner.query("ALTER TABLE \"lodges_modalities\" DROP CONSTRAINT \"FK_02b5b2f20c18b2dd3aadcdce401\"");
      await queryRunner.query("DROP TABLE \"lodges_modalities\"");
    }
}
