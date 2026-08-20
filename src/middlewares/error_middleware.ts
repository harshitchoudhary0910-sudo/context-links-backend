import { AppError } from "../AppError";
import { Request, Response, NextFunction } from "express"
export function errorMiddleware(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            code: err.code,
            message: err.message,
            ...(err.details !== undefined && {
                details: err.details
            })
        });
    }

    return res.status(500).json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong"
    });
}