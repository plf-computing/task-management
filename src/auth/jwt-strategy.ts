import { PassportStrategy } from "@nestjs/passport";
import {Strategy,ExtractJwt} from 'passport-jwt';
import { JwtPayload } from "./jwt-payload.interface";
import { InjectModel } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "./auth.schema";
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:process.env.JWT_SECRET,

        });
    }
    async validate(payload:JwtPayload){
        const {username} = payload
        const user = await this.userModel.findOne({username});

        if(!user){
            throw new UnauthorizedException

        }
        return user;

    }
}