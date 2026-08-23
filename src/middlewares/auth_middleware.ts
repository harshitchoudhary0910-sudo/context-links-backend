import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../AppError";

interface JwtPayload {
    userId: string;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    

        const token: string | undefined = req.cookies.token;

        if (!token) {
throw new AppError(
    "missing token",
    401,
    "UNAUTHORIZED ACCESSS"

)
        }
        try{

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        req.userId = decoded.userId;

        next();

    } catch(error) {
        throw new AppError(
            "invalid or expored token",
            401,
           "UNAUTHORIZED_ACCESS"

        )
       

    }
}