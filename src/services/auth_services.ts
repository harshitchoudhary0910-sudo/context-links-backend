import bcrypt from "bcrypt";
import user_repository from "../repository/user_repository";
import jwt from "jsonwebtoken";
async function SignUpService(name: string,email:string,password:string){
        
    const user=await user_repository.findOneUser({email:email});
    if(user){
        return null;

    }
    const hashedPassword=await bcrypt.hash(password,10);

    const newUser=await user_repository.createUser({name,email,password:hashedPassword});
    return newUser;
}

async function SignInService(email:string,password:string){
    const user=await user_repository.findOneUser({email:email});
    if(!user){
        return null;
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        return null;
    }
    const token=jwt.sign({userId:user._id},process.env.JWT_SECRET as string,{expiresIn:"1h"});

    return token;
}

export  default {SignUpService,SignInService}