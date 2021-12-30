import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository<User>{
  async createUser(AuthCredentialsDto:AuthCredentialsDto):Promise<{}>{
    const { email,phone,userName,password}=AuthCredentialsDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password,salt);
    
    const user = this.create({email,phone,userName,password:hashedPassword});

    try{
      await this.save(user);
      return {result:"success"}
    }catch(error){
      console.log('error',error);
      if(error.code === 'ER_DUP_ENTRY'){
        throw new ConflictException('Existing email ')
      }
      else{
        throw new InternalServerErrorException();
      }
    }
  }

}