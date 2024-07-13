import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './auth.schema';
import { AuthDto} from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel:mongoose.Model<User>

    ){}

    async signup(authDto:AuthDto):Promise<void>{
        const{username,password}= authDto;

        const user = new User();
        user.username =username;
        const salt= await bcrypt.genSalt();
        user.salt = salt;
        user.password = await this.hashPassword(password,salt);

        
            await this.userModel.create(user)
        

       
    }
    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
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
      
      async signIn(authDto: AuthDto) {
        const username = await this.validateUserPassword(authDto);
        if (!username) {
          throw new UnauthorizedException('Invalid Username or Password');
        }
      }
    
    // async validatePassword(password: string): Promise<boolean> {
        
    //     const hash = await bcrypt.hash(password,this.salt);
    //     return hash === this.password;
    //   }
    // async validateUserPassword(authDto:AuthDto):Promise<string>{
    //         const{username,password}=authDto;
    //         const user = await this.userModel.findOne({username})
            

    //         if(user && await this.validatePassword(password)){
    //             return user.username;
                
    //         }else{
    //             return null;

    //         }
    // }

    // async signIn(authDto:AuthDto){
    //         const username = await this.validateUserPassword(authDto);
    //         if(!username){
    //             throw new UnauthorizedException('Invalid Username or Password')
        
    //         }
    // }
        
  

    // private  async hashedPassword(password:string, salt:string):Promise<string>{
    //         return bcrypt.hash(password,salt)
    // }



}
