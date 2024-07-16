import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './auth.schema';
import { AuthDto} from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>,
        private jwtService:JwtService,

    ){}

    async signup(authDto:AuthDto):Promise<void>{
        const{username,password}= authDto;

        const user = await this.userModel.findOne({ username });
        if (user) {
            throw new ConflictException('Username already exists');
          }
  const salt = await bcrypt.genSalt();
  const hashedPassword = await this.hashPassword(password, salt);

  const newUser = new this.userModel({
    username,
    salt,
    password: hashedPassword,
  });

  await newUser.save();

     
        

       
    }
   
      
      private async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
      }
      
      async validatePassword(password: string, user: any): Promise<boolean> {
        return await this.comparePassword(password, user.password);
      }
      
      async validateUserPassword(authDto: AuthDto): Promise<string> {
        const { username, password } = authDto;
        const user = await this.userModel.findOne({ username });
      
        if (user && await this.validatePassword(password, user)) {
          return user.username;
        } else {
          return null;
        }
      }
      
      async signIn(authDto: AuthDto):Promise<{token:string}> {
        const username = await this.validateUserPassword(authDto);
        if (!username) {
          throw new UnauthorizedException('Invalid Username or Password');
        }
        const payload = {username};
        const token = await this.jwtService.sign(payload);
        return {token};

        
      }
    


      private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
      }
    

}
