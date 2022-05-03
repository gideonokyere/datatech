"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const type_graphql_1 = require("type-graphql");
const apollo_server_1 = require("apollo-server");
const user_resolver_1 = __importDefault(require("./resolvers/user.resolver"));
const auth_controller_1 = require("./controllers/auth.controller");
const PORT = process.env.PORT || 8080;
async function bootstrap() {
    const schema = await (0, type_graphql_1.buildSchema)({
        resolvers: [user_resolver_1.default],
        authChecker: auth_controller_1.VerifyToken
    });
    const server = new apollo_server_1.ApolloServer({
        schema,
        context: ({ req, res }) => {
            return {
                req,
                res
            };
        }
    });
    await server.listen(PORT, () => console.log(`Server is running on port:${PORT}`));
}
bootstrap();
//# sourceMappingURL=index.js.map