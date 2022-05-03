import jwt from 'jsonwebtoken';
import { Request,Response } from 'express';
import { AuthChecker } from 'type-graphql';

interface Context{
    req:Request,
    res:Response
}

interface TokenContext{
    userId:string
}

//Get client token and verify it
export const VerifyToken:AuthChecker<Context>=({context})=>{
   const authorization = context.req.get('Authorization');
   if(!authorization){
       throw new Error('Jwt token not found');
   }
   const token = authorization.replace('Bearer ','');
       const isVerify = jwt.verify(token,process.env.JWT_SIGNATURE);
       if(!isVerify){
           return false;
       }
     return true;
}/****End Of Verify Token Function */