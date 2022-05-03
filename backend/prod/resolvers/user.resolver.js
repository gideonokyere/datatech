"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const user_controller_1 = require("../controllers/user.controller");
const user_input_1 = require("../dto/user.input");
const user_middleware_1 = __importDefault(require("../middleware/user.middleware"));
let UserResolver = class UserResolver {
    //Get user
    async getUserById(ctx) {
        return await (0, user_controller_1.GetUserById)(ctx.res.locals.userId);
    }
    ;
    //SignUp New User
    async signUp(newUserData) {
        const token = await (0, user_controller_1.SignUp)(newUserData);
        return token;
    }
    ;
    //SignIn User
    async signIn(signInData) {
        const token = await (0, user_controller_1.SignIn)(signInData);
        return token;
    }
    ;
    //Update User
    async updateUser(updateData, ctx) {
        const updateUserData = await (0, user_controller_1.UpdateUser)(ctx.res.locals.userId, updateData);
        return updateUserData;
    }
};
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Query)(returns => user_schema_1.default),
    (0, type_graphql_1.UseMiddleware)(user_middleware_1.default),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "getUserById", null);
__decorate([
    (0, type_graphql_1.Mutation)(returns => String),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signUp", null);
__decorate([
    (0, type_graphql_1.Mutation)(returns => String),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "signIn", null);
__decorate([
    (0, type_graphql_1.Authorized)(),
    (0, type_graphql_1.Mutation)(returns => user_schema_1.default),
    (0, type_graphql_1.UseMiddleware)(user_middleware_1.default),
    __param(0, (0, type_graphql_1.Arg)('data')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_input_1.UserUpdateInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)(user_schema_1.default)
], UserResolver);
exports.default = UserResolver;
//# sourceMappingURL=user.resolver.js.map