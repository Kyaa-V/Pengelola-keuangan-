import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AddForm } from "../model/modelAddForm";
import { responseError } from "../error/response-error";
import { formService } from "../service/form-service";

export class formController {
    static async addForm(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);
            const request: AddForm = req.body as AddForm;
            console.log("start");
            const data = await formService.add(request);
            res.status(201).json({ data: data });
        } catch (error) {
            if (error instanceof ZodError) {
                return next(error);
            }
            next(new responseError(401, "gagal post data coba ulangi  lagi"));
        }
    }
}
