import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProjectUsers1647469507123 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project-users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'project_id',
            type: 'varchar',
          },
          {
            name: 'person_id',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project-users');
  }
}
