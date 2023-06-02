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
import User from "./User";
import { DataTypes, Optional } from "sequelize";

export interface SessionAttributes {
  id: string;
  userId: string;
  userAgent: string;
  user: User;
}

export interface SessionCreationAttributes
  extends Optional<SessionAttributes, "id" | "user"> {}

@Table
export default class Session extends Model<
  SessionAttributes,
  SessionCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @Column(DataType.STRING(300))
  userAgent!: string;
}
