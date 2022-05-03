"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = exports.GetUserById = exports.SignIn = exports.SignUp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
//SignUp Function
const SignUp = (newUser) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await prisma.user.findUnique({ where: { email: `${newUser['email']}` } });
            //If user exsit reject the request
            if (user) {
                reject('This email is already associated with an account');
            }
            //checking to see if email address and password are provided;
            if (!newUser.email && !newUser.password) {
                reject('Please provide email or password');
            }
            //proceed to signup new user//
            //Hash User's password
            const hashPassword = await bcryptjs_1.default.hash(`${newUser['password'].trim()}`, 10);
            //Save user to the database
            const saveUser = await prisma.user.create({ data: {
                    email: newUser['email'],
                    password: hashPassword
                } });
            //Sign a JWT token and send it to the client.
            jsonwebtoken_1.default.sign({ userId: saveUser.id }, process.env.JWT_SIGNATURE, { expiresIn: '2 days' }, (error, token) => {
                if (error) {
                    reject(error);
                }
                resolve(token);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}; /******** End Of SignUp Function*/
exports.SignUp = SignUp;
//SignIn Function
const SignIn = (credentials) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = credentials;
            if (!email && !password) {
                reject('Please provide your email and password');
            }
            const user = await prisma.user.findUnique({ where: { email: `${email}` } });
            //Checking if user has already signup
            if (!user) {
                reject('User not found');
            }
            //Hash password and compare it to the one in the database
            //const hashPassword = await bcrypt.hash(`${password.trim()}`,10);
            const confirmPassword = await bcryptjs_1.default.compare(`${password}`, `${user['password']}`);
            if (!confirmPassword) {
                reject('Invalid password please try again');
            }
            //Sign a JWT token and send it to the client
            jsonwebtoken_1.default.sign({ userId: user['id'] }, process.env.JWT_SIGNATURE, { expiresIn: '2 days' }, (error, token) => {
                if (error) {
                    reject(error);
                }
                resolve(token);
            });
        }
        catch (error) {
            reject(error);
        }
        ;
    });
}; /***** End Of SingIn Function */
exports.SignIn = SignIn;
//Get User By ID
const GetUserById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) {
                reject('user not found');
            }
            resolve(user);
        }
        catch (error) {
            reject(error);
        }
    });
}; /******End Of GetUserById Function */
exports.GetUserById = GetUserById;
//Update User Info
const UpdateUser = (id, user) => {
    return new Promise(async (resolve, reject) => {
        try {
            let { name, bio, phone, email, password } = user;
            const userData = await prisma.user.findUnique({ where: { id: id } });
            if (!userData) {
                reject('User not found');
            }
            let newPassword = '';
            if (password) {
                newPassword = await bcryptjs_1.default.hash(password, 10);
            }
            if (!password) {
                password = "";
            }
            const updateData = await prisma.user.update({
                data: {
                    name: name,
                    bio: bio,
                    phone: phone,
                    email: email,
                    password: password.length > 0 ? newPassword : userData.password
                },
                where: { id: `${id}` }
            });
            resolve(updateData);
        }
        catch (error) {
            reject(error);
        }
    });
}; /***** End Of UpdateUser Function */
exports.UpdateUser = UpdateUser;
//# sourceMappingURL=user.controller.js.map