import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../AppError";

export function validate(schema: ZodType) {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
          throw new AppError(
            "validation failed",
            400,
            "VALIDATION_FAILED",
            result.error.flatten().fieldErrors
        )


          
        }

        req.body = result.data;

        next();
    };
}
export function validateParams(schema: ZodType) {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        const result = schema.safeParse({
            params: req.params
        });

        if (!result.success) {
            throw new AppError(
            "validation failed",
            400,
            "VALIDATION_FAILED",
            result.error.flatten().fieldErrors
        )

        }

        req.params = result.data.params;

        next();
    };
}