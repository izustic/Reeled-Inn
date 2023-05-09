import { NextFunction } from 'connect';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/userModel';

const jwtsecret = process.env.JWT_SECRET as string;

export async function auth(
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<unknown> {
  try {
    const authorization = req.cookies.token;

    if (!authorization) {
      return res.redirect('/login');
    }

    const verified = jwt.verify(authorization, jwtsecret) as { id: string };

    if (!verified) {
      return res.redirect('/login');
    }

    const { id } = verified;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.redirect('/login');
    }

    req.user = verified;
    next();
  } catch (err) {
    return res.redirect('/login');
  }
}
