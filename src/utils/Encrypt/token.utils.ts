import jwt, { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';
import crypto from 'crypto';

export const generateToken = (
  payload: object,
  secretKey: jwt.Secret = process.env.TOKEN_SECRET_KEY as string,
  options?: SignOptions
): string => {
  return jwt.sign(payload, secretKey, {
    ...options,
    jwtid: crypto.randomUUID(),
  });
};

export const verifyToken = (
  token: string,
  secretKey: jwt.Secret = process.env.TOKEN_SECRET_KEY as string,
  options?: VerifyOptions
) => {
  return jwt.verify(token, secretKey, options) as JwtPayload;
};
