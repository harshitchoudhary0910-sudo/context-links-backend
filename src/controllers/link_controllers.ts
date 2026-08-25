import type { Request,Response } from "express";
import linkServices from "../services/Link_services";
import linkRepository from "../repository/link_repository";
import {RedirectLinkParams} from "../validator/link_validator";
import z from "zod";
import LinkModel from "../models/link_model";
import { AppError } from "../AppError";


export async function  createLinkController(req:Request,res:Response): Promise<Response>{
    const longUrl:string=req.body.longUrl;
    const userId=req.userId;
    if (!userId) {
  throw new AppError(
    "User ID missing",
    401,
    "UNAUTHORIZED_ACCESS"
  );
};
    const link=await linkServices.generate(longUrl,userId);
    return res.status(201).json({message:"Link created successfully",shortCode:link.shortCode});

}

export async function redirectLinkController(req: Request<RedirectLinkParams>,res:Response): Promise<void|Response>{
    const shortCode:string=req.params.shortCode;


    const longUrl=await linkServices.redirect(shortCode);

    return res.status(302).redirect(longUrl);
}

export async function getLinksController(req:Request,res:Response){
    const cursor=req.query.cursor;
    const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 10;

    const query:any={userId:req.userId};

      if (cursor) {
        query._id = { $lt: cursor }; 
    }

    const links:any = await LinkModel.find(query)
        .limit(limit + 1)
        .sort({ _id: -1 });

    const hasNextPage = links.length > limit;
    if (hasNextPage) links.pop();

    res.json({
        links,
        nextCursor: hasNextPage ? links[links.length - 1]._id : null
    });
}







