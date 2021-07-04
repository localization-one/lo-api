import { applyDecorators } from '@nestjs/common';
import { Column, ColumnOptions } from 'typeorm';

const TextColumn = (options: ColumnOptions = {}) =>
  applyDecorators(
    Column({
      type: 'text',
      ...options,
    }),
  );

export { TextColumn };
