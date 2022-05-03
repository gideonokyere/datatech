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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserUpdateInput = exports.UserInput = void 0;
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
let UserInput = class UserInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], UserInput.prototype, "password", void 0);
UserInput = __decorate([
    (0, type_graphql_1.InputType)({ description: 'Credential input' })
], UserInput);
exports.UserInput = UserInput;
let UserUpdateInput = class UserUpdateInput {
};
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(30),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "bio", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MinLength)(10),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "phone", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "picUrl", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "email", void 0);
__decorate([
    (0, type_graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.MinLength)(6),
    (0, class_validator_1.MaxLength)(15),
    __metadata("design:type", String)
], UserUpdateInput.prototype, "password", void 0);
UserUpdateInput = __decorate([
    (0, type_graphql_1.InputType)()
], UserUpdateInput);
exports.UserUpdateInput = UserUpdateInput;
//# sourceMappingURL=user.input.js.map