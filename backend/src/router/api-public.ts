import express from "express";
import { formController } from "../controller/form-controller";

export const publicRouter = express.Router();

publicRouter.post("/add-form-transaksi", formController.addForm);
publicRouter.get("/today", formController.today);
publicRouter.get("/yesterday", formController.yesterday);
publicRouter.get("/in-weeks", formController.inWeeks);
publicRouter.get("/in-month", formController.inMonth);
publicRouter.get("/last-month", formController.lastMonth);
publicRouter.get("/one-month", formController.oneMonth);
