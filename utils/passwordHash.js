import { hash,compare } from "bcrypt";
export async function genHash(password){
    const newPassword = await hash(password,1)
    return newPassword
}

export async function compareHash(hash,password){
    const result = await compare(password,hash)
    return result
}