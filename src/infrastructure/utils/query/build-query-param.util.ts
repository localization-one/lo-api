import { OrderType } from '../enums';
import { BaseEntity } from '../../../base';

const buildColumns = <ENTITY>(...keys: Array<keyof ENTITY>): string[] =>
  (keys as unknown) as string[];

const buildQueryParam = <ENTITY>(
  key: keyof ENTITY,
  state: '=' | '!=' = '=',
  alias?: string,
): string => {
  const prefix = alias ? alias + '.' + key : key;
  return prefix + state + ':' + key;
};
const buildQueryValue = <ENTITY>(key: keyof ENTITY, value) => {
  return { [key]: value };
};
const buildKey = <ENTITY>(key: keyof ENTITY): keyof ENTITY =>
  datesKeys<ENTITY>(key);
const buildOrder = (orderType: OrderType): 'ASC' | 'DESC' =>
  OrderType[orderType];

const datesKeys = <ENTITY>(key: keyof ENTITY): keyof ENTITY => {
  const filterKey = [key].find(Boolean);
  switch (filterKey as keyof BaseEntity) {
    case 'createdAt':
      return 'created_at' as keyof ENTITY;
    case 'updatedAt':
      return 'updated_at' as keyof ENTITY;
    default:
      return filterKey;
  }
};
export { buildColumns, buildQueryParam, buildQueryValue, buildKey, buildOrder };
