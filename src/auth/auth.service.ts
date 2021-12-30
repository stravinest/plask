import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto, AuthCredentialsLoginDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService:JwtService
  ){}

  async signUp(authCredentialsDto:AuthCredentialsDto):Promise<{}>{
    return this.userRepository.createUser(authCredentialsDto)
  }

  async signIn(authCredentialsLoginDto:AuthCredentialsLoginDto):Promise<{accessToken:string}>{
    const {email,password} = authCredentialsLoginDto;
    const user = await this.userRepository.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
      // 유저 토큰 생성(Secret + payload)
      const payload={email}
      const accessToken = await this.jwtService.sign(payload);
      
      return {accessToken: accessToken};
    }else{
      throw new UnauthorizedException('login failed')
    }
    
  }
  async deleteUser(user:User):Promise<{}>{
    console.log(user.email)
    const result = await this.userRepository.delete({email:user.email});
    console.log('resultaffected',result.affected)
    console.log(result)
    if(result.affected===0){
      throw new NotFoundException(`찾을수 없습니다. ${user.email}`)
    }
    console.log('result',result)
    return {result:'delete success'}
  }
}
