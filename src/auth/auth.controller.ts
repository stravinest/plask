import { Body, Controller, Delete, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto, AuthCredentialsLoginDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService:AuthService){}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authcredentialsDto:AuthCredentialsDto):Promise<{}>{
    return this.authService.signUp(authcredentialsDto)
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsLoginDto:AuthCredentialsLoginDto):Promise<{accessToken:string}>{
    return this.authService.signIn(authCredentialsLoginDto)
  }

  @Delete('/delete')
  @UseGuards(AuthGuard())
  deleteUser(@GetUser() user:User):Promise<{}>{
    console.log('user',user)
    return this.authService.deleteUser(user)
  }
}

