import { InputType,Field } from "type-graphql";
import { IsEmail,MinLength,MaxLength } from "class-validator";

@InputType({description:'Credential input'})
export class UserInput{
    @Field()
    @IsEmail()
    email:string;

    @Field()
    @MinLength(6)
    @MaxLength(15)
    password:string;
}

@InputType()
export class UserUpdateInput{
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

    @Field({nullable:true})
    picUrl:string;

    @Field({nullable:true})
    @IsEmail()
    email:string;

    @Field({nullable:true})
    @MinLength(6)
    @MaxLength(15)
    password:string;
}