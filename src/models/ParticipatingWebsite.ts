import { DataTypes, Optional } from 'sequelize';
import {
  Column,
  DataType,
  IsUUID,
  PrimaryKey,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './User';

export interface ParticipatingWebsiteAttributes {
  id: string;
  company: string;
  role: string;
  userId: string;
  user: User;
}

export interface ParticipatingWebsiteCreationAttributes
  extends Optional<ParticipatingWebsiteAttributes, 'id' | 'user'> {}

@Table
export default class ParticipatingWebsite extends Model<
  ParticipatingWebsiteAttributes,
  ParticipatingWebsiteCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column({ type: DataType.STRING(250) })
  company!: string;

  @Column({ type: DataType.STRING(150) })
  role!: string;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
}
