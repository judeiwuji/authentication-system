import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import Developer from "./Developer";
import crypto from "crypto";
import { DataTypes, Optional } from "sequelize";

export interface ClientAppAttributes {
  id: string;
  developerId: string;
  name: string;
  redirectURL: string;
  secret: string;
  developer: Developer;
}

export interface ClientAppCreationAttributes
  extends Optional<ClientAppAttributes, "id" | "secret" | "developer"> {}

@Table
export default class ClientApp extends Model<
  ClientAppAttributes,
  ClientAppCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @ForeignKey(() => Developer)
  @Column
  developerId!: string;

  @BelongsTo(() => Developer)
  developer!: Developer;

  @Column(DataType.STRING(150))
  name!: string;

  @Column(DataType.STRING(300))
  redirectURL!: string;

  @Column({
    type: DataType.STRING(36),
    defaultValue: crypto.randomBytes(16).toString("hex"),
  })
  secret!: string;
}
