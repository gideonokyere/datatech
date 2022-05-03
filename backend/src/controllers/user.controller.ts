import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

interface User{
    id?:string
    email:string
    password:string
}

export interface Profile extends User{
    name?:string
    bio?:string
    phone?:string
    picUrl?:string
}

    
    //SignUp Function
   export const SignUp=(newUser:User):Promise<String>=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const user = await prisma.user.findUnique({where:{email:`${newUser['email']}`}});
                 //If user exsit reject the request
                 if(user){
                   reject('This email is already associated with an account');
                 }
     
                 //checking to see if email address and password are provided;
                 if(!newUser.email && !newUser.password){
                     reject('Please provide email or password');
                 }
                 
                 //proceed to signup new user//
                 //Hash User's password
                 const hashPassword = await bcrypt.hash(`${newUser['password'].trim()}`, 10);
     
                 //Save user to the database
                 const saveUser:User = await prisma.user.create({data:{
                     email:newUser['email'],
                     password:hashPassword
                 }});
     
                 //Sign a JWT token and send it to the client.
                 jwt.sign({userId:saveUser.id},process.env.JWT_SIGNATURE,{expiresIn:'2 days'},(error:unknown,token:string)=>{
                     if(error){
                        reject(error);
                     }
                     resolve(token);
                 });
     
            } catch (error) {
                reject(error);
            }
        }); 
    };/******** End Of SignUp Function*/


    //SignIn Function
    export const SignIn = (credentials:User):Promise<String>=>{
       return new Promise(async(resolve,reject)=>{
           try {
            const {email,password} = credentials;

            if(!email && !password){
                reject('Please provide your email and password')
            }

            const user:Profile = await prisma.user.findUnique({where:{email:`${email}`}});
            //Checking if user has already signup
            if(!user){
                reject('User not found');
            }

            //Hash password and compare it to the one in the database
            //const hashPassword = await bcrypt.hash(`${password.trim()}`,10);
            const confirmPassword = await bcrypt.compare(`${password}`,`${user['password']}`);
            if(!confirmPassword){
               reject('Invalid password please try again');
            }

            //Sign a JWT token and send it to the client
            jwt.sign({userId:user['id']},process.env.JWT_SIGNATURE,{expiresIn:'2 days'},(error,token)=>{
                if(error){
                    reject(error);
                }
                resolve(token);
            });

           } catch (error) {
               reject(error);
           }; 
       });
    };/***** End Of SingIn Function */

    
    //Get User By ID
    export const GetUserById = (id:string):Promise<Profile>=>{
        return new Promise(async(resolve,reject)=>{
            try {
                const user:Profile = await prisma.user.findUnique({where:{id}});
                if(!user){
                    reject('user not found');
                }
                resolve(user)
            } catch (error) {
                reject(error);
            }
        });
    };/******End Of GetUserById Function */


    //Update User Info
    export const UpdateUser = (id:string,user:Profile):Promise<Profile>=>{
        return new Promise(async(resolve,reject)=>{
            try {
                let {name,bio,phone,email,password} = user;
                const userData:Profile = await prisma.user.findUnique({where:{id: id}});
                if(!userData){
                  reject('User not found');
                }

               let newPassword:string =  '';
               if(password){
                newPassword = await bcrypt.hash(password,10);
               }

               if(!password){
                   password="";
               }

              const updateData:Profile = await prisma.user.update({
                data: {
                    name: name,
                    bio: bio,
                    phone: phone,
                    email: email,
                    password: password.length>0?newPassword:userData.password
                },
                where:{id:`${id}`}
               });
               resolve(updateData)
              } catch (error) {
                reject(error);
              }
            });
           };/***** End Of UpdateUser Function */