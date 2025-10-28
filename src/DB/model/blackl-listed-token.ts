import mongoose, { Model,Schema } from "mongoose";
import { IBlackListedToken } from "../../common";
const blackListedtTokenSchema=new mongoose.Schema<IBlackListedToken>({
tokenId:{
    type:String,
    required:true
},
expiresAt:{
    type:Date,
    required:true
}}
)
const blackListedTokenModel=mongoose.model<IBlackListedToken>("blackListedtToken",blackListedtTokenSchema)
export {blackListedTokenModel}