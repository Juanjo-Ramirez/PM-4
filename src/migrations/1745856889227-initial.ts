import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1745856889227 implements MigrationInterface {
    name = 'Initial1745856889227'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "description" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "stock" integer NOT NULL, "imgUrl" character varying(255), "categoriesId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderDetails" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" numeric(10,2) NOT NULL, CONSTRAINT "PK_11d407f307ebf19af9702464e22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orders" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid NOT NULL, "orderDetailsId" uuid, CONSTRAINT "REL_cb8486eaad7a292ff78b37d761" UNIQUE ("orderDetailsId"), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(80) NOT NULL, "phone" integer, "country" character varying(50), "city" character varying(50), "address" character varying(50), "role" "public"."users_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order_details_products" ("order_details_id" uuid NOT NULL, "product_id" uuid NOT NULL, CONSTRAINT "PK_3862faaeb6f4b71b4473edcf152" PRIMARY KEY ("order_details_id", "product_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1926953a351a481eb20231429b" ON "order_details_products" ("order_details_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_fac3bbf92765b25be9eaafb28a" ON "order_details_products" ("product_id") `);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b" FOREIGN KEY ("categoriesId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610" FOREIGN KEY ("orderDetailsId") REFERENCES "orderDetails"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_1926953a351a481eb20231429b7" FOREIGN KEY ("order_details_id") REFERENCES "orderDetails"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "order_details_products" ADD CONSTRAINT "FK_fac3bbf92765b25be9eaafb28a1" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_fac3bbf92765b25be9eaafb28a1"`);
        await queryRunner.query(`ALTER TABLE "order_details_products" DROP CONSTRAINT "FK_1926953a351a481eb20231429b7"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_cb8486eaad7a292ff78b37d7610"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_151b79a83ba240b0cb31b2302d1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_3a9ea78a0f8110a3618098dc39b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fac3bbf92765b25be9eaafb28a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1926953a351a481eb20231429b"`);
        await queryRunner.query(`DROP TABLE "order_details_products"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TABLE "orderDetails"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
