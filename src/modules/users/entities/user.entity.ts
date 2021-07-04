import { Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { SCHEMAS } from '../../../database';
import { TextColumn } from '@infrastructure/decorators';
import { UserRole } from '@modules/users/entities/user-role.entity';

@Entity({ name: 'users', schema: SCHEMAS.USERS })
export class User extends BaseEntity {
  @TextColumn()
  email: string;

  @TextColumn()
  firstName: string;

  @TextColumn()
  lastName: string;

  @TextColumn()
  password: string;

  @ManyToMany(
    () => UserRole,
    role => role.users,
  )
  @JoinTable({
    name: 'users-x-roles',
    schema: SCHEMAS.USERS,
    joinColumn: { name: 'role_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  roles: UserRole[];
}
