import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
            console.log("COOKIES:", req.cookies);
    console.log("TOKEN:", req.cookies.token);
        const token: string | undefined = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Access denied"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET!
        ) as JwtPayload;

        res.locals.userId = decoded.userId;

        next();

    } catch(error) {
        console.log(error)
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}