import type { Request,Response } from "express";
import { generate } from "../services/Link_services";



export async function generateLinkController(req:Request,res:Response): Promise<Response>{
    const longUrl:String=req.body.longUrl;
    const ShortUrl=generate()

}