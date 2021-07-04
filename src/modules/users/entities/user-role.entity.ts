import { Entity, ManyToMany } from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { BooleanColumn, TextColumn } from '@infrastructure/decorators';
import { SCHEMAS } from '../../../database';
import { User } from '@modules/users/entities/user.entity';

@Entity({ name: 'roles', schema: SCHEMAS.USERS })
export class UserRole extends BaseEntity {
  @TextColumn()
  name: UserRole;

  @BooleanColumn({ default: true })
  active: boolean;

  @ManyToMany(
    () => User,
    user => user.roles,
  )
  users: User[];
}
