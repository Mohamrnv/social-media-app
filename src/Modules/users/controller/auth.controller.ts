import { authentication } from "../../../Middleware";
import authService from "../services/auth.service";
import { Router } from "express";

const AuthController = Router()

AuthController.post('/signup', authService.signup)
AuthController.post('/signin',authService.signin)
AuthController.post('/confirmEmail',authentication,authService.confirmEmail)
AuthController.post('/logout',authentication,authService.logout)
export { AuthController };
