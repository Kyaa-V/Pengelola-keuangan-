import express from "express";
import { formController } from "../controller/form-controller";

export const publicRouter = express.Router();

publicRouter.post("/add-form-transaksi",formController.addForm)
