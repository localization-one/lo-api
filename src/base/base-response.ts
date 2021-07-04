import { ID } from '../infrastructure';

export class BaseResponse {
  id: ID;
  createdAt: number;
  updatedAt: number;
  constructor(entity: any) {
    this.id = entity.id;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
