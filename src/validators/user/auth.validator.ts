import z from 'zod';
import { GenderEnum, RoleEnum } from '../../common';
import { isValidObjectId } from 'mongoose';

export const signupValidator = {
    body: z.strictObject({
        firstName: z.string().min(2).max(10),
        lastName: z.string().min(2).max(10),
        email: z.string().email(),
        password: z.string(),
        passwordConfirmation: z.string(),
        gender: z.enum(GenderEnum),
        DOB: z.coerce.date().optional(),
        role: z.enum(RoleEnum),
        phoneNumber: z.string().min(11).max(11),
        userId: z.string().optional()
    }).superRefine((val, cxt) => {
        console.log({
            val,
            cxt
        });
        
        // password and confirmation password matching
        if (val.password !== val.passwordConfirmation) {
            cxt.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Passwords do not matchhhhhhhhhhhh',
                path: ['passwordConfirmation']
            });
        }
        
        // User is a valid mongoose id
        if (val.userId && !isValidObjectId(val.userId)) {
            cxt.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Invalid user id',
                path: ['userId']
            });
        }
    })
};