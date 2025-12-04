import z from 'zod'
import { signupValidator } from '../../validators/user'
export type signupBodyType=z.infer<typeof signupValidator.body>