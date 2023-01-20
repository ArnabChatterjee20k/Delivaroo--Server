import { hash } from "bcrypt";
export async function genHash(password){
    const newPassword = await hash(password,1)
    return newPassword
}