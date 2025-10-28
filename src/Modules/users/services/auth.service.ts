import { NextFunction, Request, Response } from "express";
import { IOTP, IUser, OtpTypesEnum } from "../../../common";
import { userModel } from "../../../DB/model";
import { UserRepository } from "../../../DB/Repositories";
import { CompareHash, encrypt, generateHash } from '../../../utils'
import { customAlphabet } from "nanoid";
import { localEmmiter } from "../../../utils/Encrypt/services/email.utils";
import { generateToken } from "../../../utils/Encrypt/token.utils";
const generateOtp = customAlphabet('0123456789', 6)
class AuthService {
  private userRepo: UserRepository = new UserRepository(userModel);

  signup = async (req: Request, res: Response) => {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      phoneNumber,
      role,
      DOB,
    }: Partial<IUser> = req.body;
    const isEmailExist = await this.userRepo.findOneDocuments(
      { email },
      "email"
    );
    if (isEmailExist)
      return res.status(409).json({ message: "Email Already Exist" });

    const encPhone = encrypt(phoneNumber as string)
    const hashPass = generateHash(password as string)
    const otp = generateOtp()
    const hashOtp = generateHash(otp)
    console.log(otp);
    const confirmationOtp: IOTP = {
      value: hashOtp,
      expiresAt: new Date(Date.now() + 600000),
      otpType: OtpTypesEnum.CONFIRMATION
    }
    localEmmiter.emit('sendEmail', { to: email, subject: "OTP for sign Up", content: `your OTP is ${otp}` })
    const newUser: IUser = await this.userRepo.createOneDocument({
      firstName,
      lastName,
      email,
      password: hashPass,
      gender,
      phoneNumber: encPhone,
      role,
      DOB,
      OTPS: [confirmationOtp]
    } as Partial<IUser>);
    return res.status(201).json({ data: newUser, otp })
  };
  signin = async (req: Request, res: Response) => {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Email or password not correct" })
    }
    const matchPass = CompareHash(password, user.password)
    if (!matchPass) {
      return res.status(401).json({ message: "Email or password not correct" })
    }
    const accessToken = generateToken({ id: user._id, email: user.email, provider: user.provider, role: user.role }, process.env.TOKEN_SECRET_KEY as string)
    return res.status(201).json({ accesToken: accessToken })
  }
  confirmEmail = async (req: Request, res: Response) => {
    const { otp } = req.body
    const user = req.loggedUser
    const hashesOtp = user?.user.OTPS?.[0]?.value
    const isMatch = CompareHash(otp, hashesOtp as string)
    if (!isMatch) {
      return res.status(401).json({ message: "incorrect otp" })
    }
    await this.userRepo.findAndUpdateDocument(
      { email: user?.user.email },
      { isVerified: true }
    )

    return res.status(201).json({ message:"your email is verified Now " })

  }

}

export default new AuthService()
