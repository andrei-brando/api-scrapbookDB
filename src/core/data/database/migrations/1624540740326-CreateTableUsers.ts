import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTableUsers1624540740326 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(new Table({
        name: 'users',
        columns: [
          {
            name: 'uid',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '40',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: false,
          },
        ],
      }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('users');
    }

}
