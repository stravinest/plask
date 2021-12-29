import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
  @IsString()
  @IsEmail()
  email:string;

  @IsString()
  phone:string;
  
  @IsString()
  userName:string;

  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/,{
    message:'적합한 비밀번호가 아닙니다.'
  })
  password:string;
}
export class AuthCredentialsLoginDto{
  @IsString()
  @IsEmail()
  email:string;

  @IsString()
  @MinLength(8)
  @Matches(/^[a-zA-Z0-9]*$/,{
    message:'적합한 비밀번호가 아닙니다.'
  })
  password:string;
}