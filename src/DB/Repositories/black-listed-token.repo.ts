import { Model } from "mongoose";
import { IBlackListedToken } from "../../common";
import { blackListedTokenModel } from "../model/blackl-listed-token";
import { BaseRepository } from "./base.repo";

export class BlackListedTokenRepo extends BaseRepository<IBlackListedToken>
{
    constructor(protected _blackListedToken:Model<IBlackListedToken>){
        super(_blackListedToken)
    }
}
