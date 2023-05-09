import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { UserAttributes } from '../model/userModel';
import { registerUserSchema, options, loginUserSchema } from '../utils/utils';
import { MovieInstance } from '../model/movieModel';

const jwtsecret = process.env.JWT_SECRET as string;

export const Register = async (req: Request, res: Response) => {
  try {
    const { email, fullname, username, password, confirm_password } = req.body;
    const iduuid = uuidv4();

    // Validate with Joi. Ensure you're getting string for email and firstname
    const validationResult = registerUserSchema.validate(req.body, options);

    if (validationResult.error) {
      return res.render('register', { error: validationResult.error.details[0].message });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 8);

    // Generate salt to id the user

    // Create user
    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      let newUser = await User.create({
        id: iduuid,
        email,
        fullname,
        username,
        password: passwordHash,
      });

      // Generate token for user using user id
      const user = await User.findOne({
        email: email,
      }) as unknown as { [key: string]: string };

      const { id } = user;

      const token = jwt.sign({ id }, jwtsecret, { expiresIn: '30mins' });

      // return  res.cookie('token', token, {httpOnly:true, maxAge: 30 * 60 * 1000})

      // otp verification

      // Email?

      return res.redirect('/login');
    }

    return res.render('register', { error: 'email is already taken' });
  } catch (err) {
    console.log(err);
  }
};

export const Login = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
  
      // Validate with Joi. Ensure you're getting string for email and firstname
      const validationResult = loginUserSchema.validate(req.body, options);
  
      if (validationResult.error) {
        return res.render('login', { error: validationResult.error.details[0].message });
      }
  
      // Find user by email
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.render('login', { error: 'Invalid email/password' });
      }
  
      // Compare password
      const validUser = await bcrypt.compare(password, user.password);
  
      if (validUser) {
        // Generate token for user using user id
        const { id } = user;
        const token = jwt.sign({ id }, jwtsecret, { expiresIn: '30d' });
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
        return res.redirect('/dashboard');
      }
  
      return res.render('login', { error: 'Invalid email/password' });
    } catch (err) {
      console.log(err);
    }
  };
  

export const getUserAndMovie = async (req: Request, res: Response) => {
  try {
    // mongoose find
    const getAllUser = await User.find().populate('movie');
    return res.status(200).json({
      msg: 'You have successfully retrieved all data',
      count: getAllUser.length,
      users: getAllUser,
    });
  } catch (err) {
    console.log(err);
  }
};

export const Logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.redirect('/');
};
