import express from "express";
import cors from "cors";
import { db } from "./database";
import { publicRouter } from "../router/api-public";
import { middlewareError } from "../middleware/middlewareError";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", publicRouter);

app.use(middlewareError);

db.connect(err => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to the MySQL database.");
});

app.listen(5000, () => console.log("server Running"));
