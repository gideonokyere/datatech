import {Arg, Authorized, Ctx, Mutation, Query, Resolver, UseMiddleware} from 'type-graphql';
import { Response } from 'express';
import UserSchema from '../schemas/user.schema';
import {SignUp,SignIn,GetUserById,Profile,UpdateUser} from '../controllers/user.controller';
import { UserInput,UserUpdateInput } from '../dto/user.input';
import GetUserId from '../middleware/user.middleware';

@Resolver(UserSchema)
class UserResolver{
   //Get user
   @Authorized()
   @Query(returns => UserSchema)
   @UseMiddleware(GetUserId)
   async getUserById(@Ctx() ctx:{res:Response}):Promise<Profile>{
     return await GetUserById(ctx.res.locals.userId);
   };

   //SignUp New User
   @Mutation(returns => String)
   async signUp(@Arg('data') newUserData:UserInput):Promise<String>{
       const token = await SignUp(newUserData);
       return token;
   };

   //SignIn User
   @Mutation(returns=>String)
   async signIn(@Arg('data') signInData:UserInput):Promise<String>{
       const token = await SignIn(signInData);
       return token;
   };

   //Update User
   @Authorized()
   @Mutation(returns=>UserSchema)
   @UseMiddleware(GetUserId)
   async updateUser(@Arg('data') updateData:UserUpdateInput,@Ctx() ctx:{res:Response}):Promise<Profile>{
       const updateUserData = await UpdateUser(ctx.res.locals.userId,updateData);
       return updateUserData;
   }

}

export default UserResolver;