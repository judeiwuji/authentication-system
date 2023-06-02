import {
  BelongsTo,
  Column,
  ForeignKey,
  IsUUID,
  PrimaryKey,
  Table,
  Model,
} from "sequelize-typescript";
import ClientApp from "./ClientApp";
import User, { UserCreationAttributes } from "./User";
import { DataTypes, Optional } from "sequelize";

export interface UserAppAttributes {
  id: string;
  clientId: string;
  userId: string;
  client: ClientApp;
  user: User;
}

export interface UserAppCreationAttribute
  extends Optional<UserAppAttributes, "id" | "client" | "user"> {}

@Table
export default class UserApp extends Model<
  UserAppAttributes,
  UserAppCreationAttribute
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @ForeignKey(() => ClientApp)
  @Column
  clientId!: string;

  @BelongsTo(() => ClientApp)
  client!: ClientApp;

  @ForeignKey(() => User)
  @Column
  userId!: string;

  @BelongsTo(() => User)
  user!: User;
}
