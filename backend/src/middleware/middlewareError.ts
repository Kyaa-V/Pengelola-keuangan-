import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { responseError } from "../error/response-error";

export const middlewareError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
)=> {
    if (error instanceof ZodError) {
        res.status(400).json({
            message: "Validation error",
            errors: error.errors
        });
    } else if (error instanceof responseError) {
        res.status(error.status).json({
            message: error.message,
            status: error.status
        });
    } else {
        res.status(500).json({
            message: "Internal server error",
            errors: error.message || "Unknown error"
        });
    }
};
