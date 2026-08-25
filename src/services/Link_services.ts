import crypto from "crypto";
import LinkModel from "../models/link_model";
 import redis from "../config/redis";
 import { AppError } from "../AppError";
 import linkRepository from "../repository/link_repository";

const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

function generateShortCode(length = 7): string {
    let result = "";

    for (let i = 0; i < length; i++) {
        const index = crypto.randomInt(0, chars.length);
        result += chars[index];
    }

    return result;
}

 async function generate(url: string, ownerId: string) {

    while (true) {
        const shortCode = generateShortCode();

        try {
            const link = await LinkModel.create({
                longUrl: url,
                shortCode: shortCode,
                userId: ownerId
            });

            return link;

        } catch (error: any) {

            
            if (error.code === 11000) {
                continue;
            }

            throw error;
        }
    }
}
async function redirect(shortCode:string){
   
       
    const cached = await redis.get(shortCode);
    if (cached) return cached as string;

    
    const link=await linkRepository.findLinkByShortCode(shortCode);
    if(!link){
       throw new AppError(
        "shourtcode not found",
        404,
        "SHORTCODE NOT FOUND"
       )
    }

    
    await redis.set(shortCode, link.longUrl, { ex: 3600 });
    
    return link.longUrl;

}

export default {generate,redirect};

