import crypto from "crypto";
import LinkModel from "../models/link_model";

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

export async function generate(url: string, ownerId: string) {

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

