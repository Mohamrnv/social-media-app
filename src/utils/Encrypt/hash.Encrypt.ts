import  { compareSync, hashSync } from "bcrypt"
export const generateHash=(plainText:string,saltRound:number =parseInt(process.env.SALT_ROUNDS as string)):string=>{
    return hashSync(plainText,saltRound)
}
export const CompareHash=(plainText:string,cipherText:string)=>{
 return compareSync(plainText,cipherText)
}
