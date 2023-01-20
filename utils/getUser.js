import User from "../models/user.js";

export async function getUserById(id){
    const user = await User.findById(id,"-password")
    return user
}

export async function getUserByEmail(email){
    const user = await User.findOne({email},"-password")
    return user
}