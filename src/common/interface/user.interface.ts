import { Request } from "express";
import { RoleEnum, GenderEnum, ProviderEnum, OtpTypesEnum } from "../enums/user.enum";
import { JwtPayload } from "jsonwebtoken";
import { Types, Document } from "mongoose";

declare module "express" {
  interface Request {
    loggedUser?: {
      user: IUser;
      token: JwtPayload;
    };
  }
}

interface IOTP {
  value: string;
  expiresAt: Date;
  otpType: OtpTypesEnum;
}

interface IUser extends Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  role?: RoleEnum;
  DOB?: Date;
  profilePicture?: string;
  coverPicture?: string;
  provider?: ProviderEnum;
  password: string;
  age: number;
  phoneNumber?: string;
  isVerified?: boolean;
  gender?: GenderEnum;
  googleId?: string;
  verifiedAt?: string;
  OTPS?: IOTP[];
}

interface IBlackListedToken extends Document {
  tokenId: string;
  expiresAt: Date;
}

interface IEmailArguments {
  to: string;
  cc?: string;
  subject: string;
  content: string;
  attachments?: [];
}

export { IUser, IEmailArguments, IOTP, Request, IBlackListedToken };
