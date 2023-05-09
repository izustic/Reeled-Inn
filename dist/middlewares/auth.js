"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const jwtsecret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    try {
        const authorization = req.cookies.token;
        if (!authorization) {
            return res.redirect('/login');
        }
        const verified = jsonwebtoken_1.default.verify(authorization, jwtsecret);
        if (!verified) {
            return res.redirect('/login');
        }
        const { id } = verified;
        const user = await userModel_1.default.findOne({ _id: id });
        if (!user) {
            return res.redirect('/login');
        }
        req.user = verified;
        next();
    }
    catch (err) {
        return res.redirect('/login');
    }
}
exports.auth = auth;
//# sourceMappingURL=auth.js.map