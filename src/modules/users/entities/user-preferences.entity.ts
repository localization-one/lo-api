import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { SCHEMAS } from '../../../database';
import { BooleanColumn } from '@infrastructure/decorators';
import { User } from '@modules/users/entities/user.entity';

@Entity({ name: 'user-preferences', schema: SCHEMAS.USERS })
export class UserPreferences extends BaseEntity {
  @BooleanColumn({ default: false })
  emailNotificationsEnabled: boolean;

  @BooleanColumn({ default: false })
  smsNotificationsEnabled: boolean;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User['id'];
}
