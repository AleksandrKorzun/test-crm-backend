import { Table, Column } from 'sequelize-typescript';
import { BaseEntity } from '../base.entity';

@Table
export class User extends BaseEntity {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  phone: string;

  @Column
  password: string;

  @Column({ defaultValue: false })
  isLogin: boolean;
}
