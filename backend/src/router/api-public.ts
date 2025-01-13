import express from "express";
import { formController } from "../controller/form-controller";

export const publicRouter = express.Router();

publicRouter.post("/add-form-transaksi", formController.addForm);
publicRouter.post("/hutang", formController.hutang);
publicRouter.patch("/update-hutang-status", formController.updateHutang);
publicRouter.post("/select-date-table", formController.selectData);
publicRouter.post("/select-cutom-table", formController.selectCustom);
publicRouter.post("/select-data-category", formController.selectCategory);
publicRouter.get("/today", formController.today);
publicRouter.get("/yesterday", formController.yesterday);
publicRouter.get("/in-weeks", formController.inWeeks);
publicRouter.get("/in-month", formController.inMonth);
publicRouter.get("/last-month", formController.lastMonth);
publicRouter.get("/one-month", formController.oneMonth);
publicRouter.get("/get-hutang", formController.getHutang);
publicRouter.get("/get-hutang-lunas", formController.getHutangLunas);
