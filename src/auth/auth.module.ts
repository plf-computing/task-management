import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './auth.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt-strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
  PassportModule.register({defaultStrategy: 'jwt' }),
  JwtModule.registerAsync({
    inject:[ConfigService],
    useFactory:(config:ConfigService)=>{
      return{
        secret: config.get<string>('JWT_SECRET'),
        signOptions:{
          expiresIn:config.get<string | number>('JWT_EXPIRES')
        }
      }
    }
  }),
    MongooseModule.forFeature([{name:'User',schema: UserSchema}])],
  controllers: [AuthController],
  providers: [AuthService,
    JwtStrategy

  ],
  exports: [ JwtStrategy,PassportModule,]
})
export class AuthModule {}
