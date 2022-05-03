import { IsEmail, MaxLength,MinLength } from "class-validator";
import { ObjectType,Field,ID } from "type-graphql";

@ObjectType({description:"User schema"})
class UserSchema {
    @Field(type=>ID)
    id:string;

    @Field({nullable:true})
    @MinLength(3)
    @MaxLength(30)
    name:string;

    @Field({nullable:true})
    @MaxLength(255)
    bio:string;

    @Field({nullable:true})
    @MinLength(10)
    @MaxLength(15)
    phone:string;
    
    @Field()
    @IsEmail()
    email:string;

    @Field({nullable:true})
    @MinLength(6)
    @MaxLength(15)
    password:string;

    @Field({nullable:true})
    picUrl:string
}

export default UserSchema;