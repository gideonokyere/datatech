"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GetUserId = async ({ context }, next) => {
    const authorization = context.req.get('Authorization');
    try {
        const token = authorization.replace('Bearer ', '');
        const user = jsonwebtoken_1.default.verify(token, process.env.JWT_SIGNATURE);
        context.res.locals.userId = user.userId;
        return next();
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.default = GetUserId;
//# sourceMappingURL=user.middleware.js.map