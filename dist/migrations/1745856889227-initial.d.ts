import { MigrationInterface, QueryRunner } from "typeorm";
export declare class Initial1745856889227 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
