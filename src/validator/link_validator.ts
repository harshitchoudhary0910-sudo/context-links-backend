import { z } from "zod";
export const redirectLinkSchema = z.object({
    params: z.object({
        shortCode: z
            .string()
            .length(7, "Invalid short code")
            .regex(/^[A-Za-z0-9]+$/, "Invalid short code")
    })
});


export const createLinkSchema = z.object({
  
        longUrl: z
            .string()
            .trim()
            .url("Invalid URL")
            .max(2048, "URL is too long")
   
});
export type RedirectLinkParams =
    z.infer<typeof redirectLinkSchema>["params"];
export type CreateLinkSchemaType = z.infer<typeof createLinkSchema>;