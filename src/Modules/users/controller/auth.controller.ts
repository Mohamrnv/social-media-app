import { authentication } from "../../../Middleware";
import authService from "../../../utils/services/auth.service";
import { Router } from "express";
import { validationMiddleware } from "../../../Middleware/validation.middleware";
import { signupValidator } from "../../../validators/user/auth.validator";
const AuthController = Router()

AuthController.post('/signup',validationMiddleware(signupValidator), authService.signup)
AuthController.post('/signin',authService.signin)
AuthController.post('/confirmEmail',authentication,authService.confirmEmail)
AuthController.post('/logout',authentication,authService.logout)
export { AuthController };
