import { Request, Response } from "express";
import { MiddlewareFn} from "type-graphql";
import jwt from 'jsonwebtoken';

interface Context {
    req:Request,
    res:Response
}

const GetUserId:MiddlewareFn<Context>=async({context},next)=>{
    const authorization = context.req.get('Authorization');
    try {
        const token = authorization.replace('Bearer ','');
        const user = jwt.verify(token,process.env.JWT_SIGNATURE) as any;
        context.res.locals.userId = user.userId;
        return next();
    } catch (error) {
        throw new Error(error);
    }
}

export default GetUserId;