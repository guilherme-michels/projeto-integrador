import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class TeamUsers1647469507654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'team-users',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'team_id',
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
    await queryRunner.dropTable('team-users');
  }
}
