import z from "zod";

 export const SignUpSchema= z.object({
    name: z.string().min(2).max(100),
    email: z.string().email(),
    password: z.string().min(6).max(100)
})

export const SignInSchema= z.object({
    email: z.string().email(),
    password: z.string().min(6).max(100)
})

export type SignUpSchemaType=z.infer<typeof SignUpSchema>
export type SignInSchemaType=z.infer<typeof SignInSchema>