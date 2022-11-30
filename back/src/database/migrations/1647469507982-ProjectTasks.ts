import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class ProjectTasks1647469507982 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project-tasks',
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
            name: 'task_id',
            type: 'varchar',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project-tasks');
  }
}
