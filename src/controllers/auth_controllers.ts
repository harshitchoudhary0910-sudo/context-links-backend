import { Request, Response } from "express";
import AuthServices from "../services/auth_services";

import { SignUpSchemaType,SignInSchemaType } from "../validator/auth_validator";
import { AppError } from "../AppError";


export async function signUpController(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body as SignUpSchemaType;

    const newUser = await AuthServices.SignUpService(name, email, password);

    if (newUser===null) {
        throw new AppError(
            "User already exists",
            400,
            "USER_EXISTS"
        )
    }

    return res.status(201).json({ message: "User created successfully"});
}

export async function signInController(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as SignInSchemaType;

    const token = await AuthServices.SignInService(email, password);
    if (!token) {
       throw new AppError(
        "invalid credentials",
        401,
        "INVALID_CREDENTIALS"
       )
    }
    res.cookie("token", token, {
        httpOnly: true,
       
        sameSite: "strict",
        maxAge: 3600000, 
    });

    return res.status(200).json({ message: "Signed in successfully", token });
}






