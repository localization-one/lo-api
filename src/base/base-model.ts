import { ID } from '../infrastructure';

class BaseModel {
  id: ID;
  createdAt: number;
  updatedAt: number;
  constructor({id, createdAt, updatedAt}: BaseModel) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}


export { BaseModel };
