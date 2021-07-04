import { Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '@base/base-entity';
import { SCHEMAS } from '../../../database';
import { User } from '@modules/users/entities/user.entity';
import { BooleanColumn } from '@infrastructure/decorators';

@Entity({ name: 'user-details', schema: SCHEMAS.USERS })
export class UserDetails extends BaseEntity {
  @BooleanColumn({ default: false })
  emailVerified: boolean;

  @BooleanColumn({ default: false })
  mobilePhoneVerified: boolean;

  @OneToOne(() => User)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: User['id'];
}
