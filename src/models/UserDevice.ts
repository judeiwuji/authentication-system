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

interface UserDeviceAttributes {
  id: string;
  userId: string;
  userAgent: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

interface UserDeviceCreationAttributes
  extends Optional<
    UserDeviceAttributes,
    "id" | "user" | "createdAt" | "updatedAt"
  > {}

@Table
export default class UserDevice extends Model<
  UserDeviceAttributes,
  UserDeviceCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @ForeignKey(() => User)
  userId!: string;

  @BelongsTo(() => User)
  user!: User;

  @Column(DataType.STRING(300))
  userAgent!: string;
}
