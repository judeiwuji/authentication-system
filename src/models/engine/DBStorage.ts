import { Sequelize } from "sequelize-typescript";
import * as mysql from "mysql2";
import * as dotenv from "dotenv";
import User from "../User";
import Developer from "../Developer";
import ClientApp from "../ClientApp";
import UserApp from "../UserApp";
import UserDevice from "../UserDevice";
import UserSecret from "../UserSecret";
import Session from "../Session";
dotenv.config();

const DB = new Sequelize({
  database: process.env["DB_NAME"],
  host: process.env["DB_HOST"],
  password: process.env["DB_PASS"],
  username: process.env["DB_USER"],
  dialect: "mysql",
  dialectModule: mysql,
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    paranoid: true,
    timestamps: true,
  },
  //   logging: false,
  timezone: "+01:00",
  models: [
    User,
    Developer,
    ClientApp,
    UserApp,
    UserDevice,
    UserSecret,
    Session,
  ],
});

export default DB;
