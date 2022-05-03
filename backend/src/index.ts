import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import { buildSchema } from 'type-graphql';
import {ApolloServer} from 'apollo-server';
import UserResolver from './resolvers/user.resolver';
import { VerifyToken} from './controllers/auth.controller';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
    const schema = await buildSchema({
        resolvers: [UserResolver],
        authChecker:VerifyToken
    });

    const server = new ApolloServer({
        schema,
        context:({req,res})=>{
            return {
                req,
                res
            };
        }
    });

    await server.listen(PORT,()=>console.log(`Server is running on port:${PORT}`));
}

bootstrap();