import UserModel from "../models/user_model";

async function createUser(userData: { name: string; email: string; password: string }) {
    const newUser=await UserModel.create(userData);
    return newUser;
}

async function findOneUser(query: { email: string }) {
    const user=await UserModel.findOne(query);
    return user;
}

export default{ createUser, findOneUser }