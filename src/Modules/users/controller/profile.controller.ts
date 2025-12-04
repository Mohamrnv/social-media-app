import {Router} from "express";
import { authentication } from "../../../Middleware";
import { Multer } from "../../../Middleware/multer.middleware";
import ProfileServices from "../../../utils/services/profile.service";
const profileController=Router()
profileController.post('/profile-picture',authentication,Multer().single("profilePicture"),ProfileServices.uploadProfile)
profileController.post('/renew-signed-url', authentication, ProfileServices.renewSignedUrl)
export {profileController}