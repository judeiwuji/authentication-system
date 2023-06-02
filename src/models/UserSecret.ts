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

export interface UserSecretAttributes {
  id: string;
  userId: string;
  question: string;
  answer: string;
  user: User;
}

export interface UserSecretCreationAttributes
  extends Optional<UserSecretAttributes, "id" | "user"> {}

@Table
export default class UserSecret extends Model<
  UserSecretAttributes,
  UserSecretCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column({ allowNull: false })
  question!: string;

  @Column({ allowNull: false, type: DataType.CHAR(60) })
  answer!: string;

  @ForeignKey(() => User)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
}
