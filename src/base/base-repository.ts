import { QueryRunner, Repository } from 'typeorm';

abstract class BaseRepository<TEntity> extends Repository<TEntity> {
  public async findAll(): Promise<TEntity[]> {
    return this.find();
  }
  public async startTransaction(): Promise<QueryRunner> {
    const queryRunner = this.manager.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    return queryRunner;
  }
}


export { BaseRepository };
