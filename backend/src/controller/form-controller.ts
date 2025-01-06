import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AddForm ,SelectDate,SelectDataCategory} from "../model/modelAddForm";
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
    static async selectData(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);
            const request: SelectDate = req.body;
            console.log("start");
            const data = await formService.select(request);
            res.status(201).json({ data: data });
        } catch (error) {
            if (error instanceof ZodError) {
                return next(error);
            }
            next(new responseError(401, "gagal post data coba ulangi  lagi"));
        }
    }
    static async selectCategory(req: Request, res: Response, next: NextFunction) {
        try {
            console.log(req.body);
            const request: SelectDataCategory = req.body;
            console.log("start");
            const data = await formService.selectCategory(request);
            res.status(201).json({ data: data });
        } catch (error) {
            if (error instanceof ZodError) {
                return next(error);
            }
            next(new responseError(401, "gagal post data coba ulangi  lagi"));
        }
    }
    static async today(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await formService.today();
            res.status(201).json({ data: data, succes: true });
        } catch (error) {
            if (error instanceof ZodError) {
                return next(error);
            }
            next(new responseError(401, "gagal get data coba ulangi  lagi"));
        }
    }
    static async yesterday(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await formService.yesterday();
            res.status(201).json({ data: data, succes: true });
        } catch (error) {
            if (error instanceof ZodError) {
                return next(error);
            }
            next(new responseError(401, "gagal get data coba ulangi  lagi"));
        }
    }
    static async inWeeks(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await formService.inWeeks();
            res.status(201).json({ data: data, succes: true });
        } catch (error) {
            if (error instanceof ZodError) {
                return next(error);
            }
            next(new responseError(401, "gagal get data coba ulangi  lagi"));
        }
    }
    static async inMonth(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await formService.inMonth();
            res.status(201).json({ data: data, succes: true });
        } catch (error) {
            if (error instanceof ZodError) {
                return next(error);
            }
            next(new responseError(401, "gagal get data coba ulangi  lagi"));
        }
    }
    static async lastMonth(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await formService.lastMonth();
            res.status(201).json({ data: data, succes: true });
        } catch (error) {
            if (error instanceof ZodError) {
                return next(error);
            }
            next(new responseError(401, "gagal get data coba ulangi  lagi"));
        }
    }
    static async oneMonth(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await formService.oneMonth();
            res.status(201).json({ data: data, succes: true });
        } catch (error) {
            if (error instanceof ZodError) {
                return next(error);
            }
            next(new responseError(401, "gagal get data coba ulangi  lagi"));
        }
    }
}
