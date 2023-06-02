import { DataTypes, Optional } from "sequelize";
import {
  Column,
  DataType,
  Table,
  Model,
  IsUUID,
  PrimaryKey,
  HasOne,
} from "sequelize-typescript";
import UserSecret from "./UserSecret";
import Developer from "./Developer";

export interface UserAttributes {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  verified: boolean;
  secret: UserSecret;
  developer?: Developer;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "verified" | "secret" | "createdAt" | "updatedAt"
  > {}

@Table
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @IsUUID(4)
  @PrimaryKey
  @Column({ defaultValue: DataTypes.UUIDV4 })
  id!: string;

  @Column({ type: DataType.STRING(30), allowNull: false })
  firstname!: string;

  @Column({ type: DataType.STRING(30), allowNull: false })
  lastname!: string;

  @Column({ type: DataType.STRING(60), allowNull: false, unique: true })
  email!: string;

  @Column({ type: DataType.STRING(60), allowNull: false })
  password!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  verified!: boolean;

  @HasOne(() => UserSecret)
  secret!: UserSecret;

  @HasOne(() => Developer)
  developer!: Developer;
}
