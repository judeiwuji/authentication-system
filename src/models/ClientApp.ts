import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import ParticipatingWebsite from './ParticipatingWebsite';
import crypto from 'crypto';
import { DataTypes, Optional } from 'sequelize';

export interface ClientAppAttributes {
  id: string;
  developerId: string;
  name: string;
  redirectURL: string;
  secret: string;
  developer: ParticipatingWebsite;
}

export interface ClientAppCreationAttributes
  extends Optional<ClientAppAttributes, 'id' | 'secret' | 'developer'> {}

@Table
export default class ClientApp extends Model<
  ClientAppAttributes,
  ClientAppCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @ForeignKey(() => ParticipatingWebsite)
  @Column
  developerId!: string;

  @BelongsTo(() => ParticipatingWebsite)
  developer!: ParticipatingWebsite;

  @Column(DataType.STRING(150))
  name!: string;

  @Column(DataType.STRING(300))
  redirectURL!: string;

  @Column({
    type: DataType.STRING(36),
    defaultValue: crypto.randomBytes(16).toString('hex'),
  })
  secret!: string;
}
