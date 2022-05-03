"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//Get client token and verify it
const VerifyToken = ({ context }) => {
    const authorization = context.req.get('Authorization');
    if (!authorization) {
        throw new Error('Jwt token not found');
    }
    const token = authorization.replace('Bearer ', '');
    const isVerify = jsonwebtoken_1.default.verify(token, process.env.JWT_SIGNATURE);
    if (!isVerify) {
        return false;
    }
    return true;
}; /****End Of Verify Token Function */
exports.VerifyToken = VerifyToken;
//# sourceMappingURL=auth.controller.js.map