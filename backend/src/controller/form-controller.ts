import { Request, Response, NextFunction } from "express";
import { AddForm } from "../model/modelAddForm";
import {responseError} from "../error/response-error"

export class formController {
    static async addForm(req: Request, res: Response, next: NextFunction) {
 
        try {
            const request: AddForm = req.body as AddForm;
            const data = await formService.add(request);
            res.status(201).json({ data: data });
        } catch (error) {
            throw new responseError("gagal post data coba ulangi lagi");
        }
    }
}
