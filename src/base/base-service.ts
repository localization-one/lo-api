import { ID } from '../infrastructure';
import { Repository } from 'typeorm';
import { FindOneOptions } from 'typeorm/find-options/FindOneOptions';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Errors } from '../core/custom/error/errors.enum';
import { ErrorModel } from '../core/custom/error/error.model';

export abstract class BaseService<ENTITY> {
  protected constructor(
    private repository: Repository<ENTITY>,
    public entityName: string,
    public relations: string[] = []
  ) {}
  async findAll(): Promise<ENTITY[]> {
    return this.repository.find({relations: this.relations});
  }
  async findById(entityId: ID): Promise<ENTITY> {
    return this.entityExists({ where: { id: entityId }, relations: this.relations });
  }
  async count(): Promise<number> {
    return this.repository.count();
  }
  async entityDoesntExists(
    predicate: FindOneOptions<ENTITY>,
  ): Promise<ENTITY> {
    const entity = await this.repository.findOne(predicate);
    if (entity) {
      throw new HttpException(
        ErrorModel.buildError({
          param: this.entityName,
          errorCode: Errors.ALREADY_EXISTS,
        }),
        HttpStatus.BAD_REQUEST,
      );
    }
    return entity;
  }
  async entityExists(
    predicate: FindOneOptions<ENTITY>,
    shouldThrowError = true
  ): Promise<ENTITY> {
    const entity = await this.repository.findOne(predicate);
    if (!entity && shouldThrowError) {
      throw new HttpException(
        ErrorModel.buildError({
          param: this.entityName,
          errorCode: Errors.NOTFOUND,
        }),
        HttpStatus.NOT_FOUND,
      );
    }
    return entity;
  }
}
