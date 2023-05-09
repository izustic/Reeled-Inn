"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMovieSchema = exports.createMovieSchema = exports.loginUserSchema = exports.options = exports.registerUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.registerUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    fullname: joi_1.default.string().required(),
    username: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    confirm_password: joi_1.default.any().equal(joi_1.default.ref('password')).required().label('Passwords').messages({ 'any.only': '{{#label}} does not match' })
});
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
};
exports.loginUserSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
});
exports.createMovieSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().min(1).max(50).required(),
    description: joi_1.default.string().lowercase().min(10).max(200).required(),
    image: joi_1.default.string().trim().lowercase().pattern(/.(jpg|jpeg|png|gif)$/).required(),
    price: joi_1.default.string().lowercase().min(0).max(10)
});
exports.updateMovieSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().min(1).max(50),
    description: joi_1.default.string().lowercase().min(10).max(200),
    image: joi_1.default.string().trim().lowercase().pattern(/.(jpg|jpeg|png|gif)$/),
    price: joi_1.default.string().lowercase().min(0).max(10)
});
//# sourceMappingURL=utils.js.map