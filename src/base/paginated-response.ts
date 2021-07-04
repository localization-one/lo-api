import { SelectQueryBuilder } from 'typeorm';
import { BasePaginationDto } from './base-pagination.dto';

class PaginatedResponse<T> {
  totalItems: number;
  totalPages: number;
  items: T[];
  async buildModel(
    query: SelectQueryBuilder<T>,
    { pageSize, pageNumber }: Pick<BasePaginationDto, 'pageSize' | 'pageNumber'>,
  ): Promise<this> {
    const [totalItems, items] = await Promise.all([
      query.getCount(),
      query
        .skip(pageSize * (pageNumber - 1))
        .take(pageSize)
        .getMany(),
    ]);
    this.totalItems = totalItems;
    this.items = items;
    const total = this.totalItems / pageSize;
    this.totalPages =
      this.totalItems % pageSize ? Math.trunc(total) + 1 : Math.trunc(total);
    return this;
  }
}

export { PaginatedResponse };
