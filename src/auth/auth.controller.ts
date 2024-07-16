import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthDto } from './dto/auth-credential.dto';
import { AuthService } from './auth.service';



@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}

    @Post('signup')
        signup(@Body(ValidationPipe) authDto:AuthDto):Promise<void>{
            return this.authService.signup(authDto);
            
        }
    @Post('signin')
    signin(@Body(ValidationPipe) authDto:AuthDto):Promise<{token:string}>{
        return this.authService.signIn(authDto)

    }
   
    
   












    }

