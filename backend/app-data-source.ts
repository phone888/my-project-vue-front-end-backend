import { DataSource } from "typeorm";
import * as mysql from "mysql2";

export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "typeorm-api",
  entities: ["src/entity/*.ts"],
  synchronize: true,
  driver: mysql,
});
