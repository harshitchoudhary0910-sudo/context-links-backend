import type { Request,Response } from "express";
import linkServices from "../services/Link_services";
import linkRepository from "../repository/link_repository";
import {RedirectLinkParams} from "../validator/link_validator";
import z from "zod";
import { AppError } from "../AppError";




export async function  createLinkController(req:Request,res:Response): Promise<Response>{
    const longUrl:string=req.body.longUrl;
    const userId:string=res.locals.userId;
    const link=await linkServices.generate(longUrl,userId);
    return res.status(201).json({message:"Link created successfully",shortCode:link.shortCode});

}
export async function redirectLinkController(req: Request<RedirectLinkParams>,res:Response): Promise<void|Response>{
    const shortCode:string=req.params.shortCode;
    const link=await linkRepository.findLinkByShortCode(shortCode);
    if(!link){
       throw new AppError(
        "shourtcode not found",
        404,
        "SHORTCODE NOT FOUND"
       )
    }
    return res.status(302).redirect(link.longUrl);
}