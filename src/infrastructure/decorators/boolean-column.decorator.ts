import { applyDecorators } from '@nestjs/common';
import { Column, ColumnOptions } from 'typeorm';

const BooleanColumn = (options: ColumnOptions = {}) =>
  applyDecorators(
    Column({
      type: 'boolean',
      ...options,
    }),
  );

export { BooleanColumn };
