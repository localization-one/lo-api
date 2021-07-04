import { BeforeInsert, BeforeUpdate, Column, Generated, Index, PrimaryGeneratedColumn } from 'typeorm';
import { getDateNow } from './date-functions';
import { ID } from '../infrastructure';

@Index(['id'], { unique: true })
export abstract class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @Generated('uuid')
  id: ID;

  @Column({ name: 'created_at', nullable: false })
  public createdAt: number;

  @Column({ name: 'updated_at', nullable: false })
  public updatedAt: number;

  @BeforeInsert()
  public setCreatedAt() {
    this.createdAt = getDateNow();
    this.updatedAt = this.createdAt;
  }

  @BeforeUpdate()
  public setUpdatedAt() {
    this.updatedAt = getDateNow();
  }
}
