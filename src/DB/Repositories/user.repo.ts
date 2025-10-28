import { IUser } from "../../common";
import { BaseRepository } from "./base.repo";
import { Model } from "mongoose";
class UserRepository extends BaseRepository<IUser>{
    constructor(protected _usermodel:Model<IUser>){
        super(_usermodel)
    }
}
export {UserRepository}