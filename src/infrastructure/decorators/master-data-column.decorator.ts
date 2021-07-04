import { applyDecorators } from '@nestjs/common';
import { Column, ColumnOptions } from 'typeorm';

const MasterDataColumn = (options: ColumnOptions = {}) => applyDecorators(
  // TODO: add automatic detection for relations accoring to options
  Column({
    type: 'varchar',
    name: 'name',
    length: 255,
    unique: true,
    ...options,
  }),
);


export { MasterDataColumn };
