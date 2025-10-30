import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/Encrypt/token.utils";
import { UserRepository } from "../DB/Repositories";
import { userModel } from "../DB/model";
import { JwtPayload } from "jsonwebtoken";
import { blackListedTokenModel } from "../DB/model/blackl-listed-token";
import { IBlackListedToken } from "../common";
import { BlackListedTokenRepo } from "../DB/Repositories/black-listed-token.repo";
const userRepo = new UserRepository(userModel)
const blackListRepo = new BlackListedTokenRepo(blackListedTokenModel)
export const authentication = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization: accessToken } = req.headers
    if (!accessToken) {
        return res.status(401).json({ message: "log in first" })
    }

    const [prefix, Token] = accessToken.split(' ')

    if (prefix != 'bearer') {
        return res.status(401).json({ message: "invalid token" })
    }
    console.log("true");

    const decodedData = verifyToken(Token)

    if (!decodedData.id) {
        return res.status(401).json({ message: "in-valid payload" })
    }

    const blackListedToken = await blackListRepo.findOneDocuments({ tokenId: decodedData.jti })

    if (blackListedToken) {
        return res.status(401).json({ message: "Session is Expired please login again !" })
    }
    const user = await userRepo.findDocumentById(decodedData.id, '-password')
    if (!user) {
        return res.status(404).json({ message: "please signUp first" })
    }

    req.loggedUser = { user, token: decodedData as JwtPayload }
    return next()
}