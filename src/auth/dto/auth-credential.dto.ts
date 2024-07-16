import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(20)
    username:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]/,
        {message: 'Password too weak'})
    password:string;
}