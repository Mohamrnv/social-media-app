import mongoose from "mongoose";
import { GenderEnum, OtpTypesEnum, ProviderEnum, RoleEnum } from "../../common";
import { IUser } from "../../common/"

const userSchema = new mongoose.Schema<IUser>({

  firstName: {
    type: String,
    required: true,
    minLength: [1, "minimum length is 2"],
    maxLength: [20, "maximum length is 20"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [2, "minimum length is 2"],
    maxLength: [20, "maximum length is 20"],
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
      name: "idx_email_unique",
    },
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: RoleEnum,
    default: "user",
  },
  gender: {
    type: String,
    enum: GenderEnum,
    default: "other",
  },
  DOB: Date,
  profilePicture: String,
  coverPicture: String,
  provider: {
    type: String,
    enum: ProviderEnum,
    default: "local",
  },
  isVerified: {
    type: String,
    default: false,
  },
  googleId: String,
  verifiedAt: Date,
  phoneNumber: String,
  OTPS:[
    {
      value:{type:String,required:true},
      expiresAt:{type:Date, default:Date.now()+600000},
      otpType:{type:String,enum:OtpTypesEnum,required:true}
    }
  ]
},{strict:true});
const userModel = mongoose.model<IUser>("User", userSchema);
export { userModel };