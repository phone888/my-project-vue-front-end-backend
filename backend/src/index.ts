import express from "express";
import cors from "cors";
import usersRoute from "./routes/usersRoute";
import "reflect-metadata";
import { myDataSource } from "../app-data-source";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

myDataSource
  .initialize()
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.use("/api/users", usersRoute);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
