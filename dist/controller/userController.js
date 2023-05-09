"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logout = exports.getUserAndMovie = exports.Login = exports.Register = void 0;
const uuid_1 = require("uuid");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const utils_1 = require("../utils/utils");
const jwtsecret = process.env.JWT_SECRET;
const Register = async (req, res) => {
    try {
        const { email, fullname, username, password, confirm_password } = req.body;
        const iduuid = (0, uuid_1.v4)();
        // Validate with Joi. Ensure you're getting string for email and firstname
        const validationResult = utils_1.registerUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render('register', { error: validationResult.error.details[0].message });
        }
        // Hash password
        const passwordHash = await bcryptjs_1.default.hash(password, 8);
        // Generate salt to id the user
        // Create user
        // Check if user exists
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            let newUser = await userModel_1.default.create({
                id: iduuid,
                email,
                fullname,
                username,
                password: passwordHash,
            });
            // Generate token for user using user id
            const user = await userModel_1.default.findOne({
                email: email,
            });
            const { id } = user;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: '30mins' });
            // return  res.cookie('token', token, {httpOnly:true, maxAge: 30 * 60 * 1000})
            // otp verification
            // Email?
            return res.redirect('/login');
        }
        return res.render('register', { error: 'email is already taken' });
    }
    catch (err) {
        console.log(err);
    }
};
exports.Register = Register;
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Validate with Joi. Ensure you're getting string for email and firstname
        const validationResult = utils_1.loginUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.render('login', { error: validationResult.error.details[0].message });
        }
        // Find user by email
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.render('login', { error: 'Invalid email/password' });
        }
        // Compare password
        const validUser = await bcryptjs_1.default.compare(password, user.password);
        if (validUser) {
            // Generate token for user using user id
            const { id } = user;
            const token = jsonwebtoken_1.default.sign({ id }, jwtsecret, { expiresIn: '30d' });
            res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            return res.redirect('/dashboard');
        }
        return res.render('login', { error: 'Invalid email/password' });
    }
    catch (err) {
        console.log(err);
    }
};
exports.Login = Login;
const getUserAndMovie = async (req, res) => {
    try {
        // mongoose find
        const getAllUser = await userModel_1.default.find().populate('movie');
        return res.status(200).json({
            msg: 'You have successfully retrieved all data',
            count: getAllUser.length,
            users: getAllUser,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.getUserAndMovie = getUserAndMovie;
const Logout = async (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};
exports.Logout = Logout;
//# sourceMappingURL=userController.js.map