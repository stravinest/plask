import { IsNotEmpty } from "class-validator";

export class createShopsDto{
  @IsNotEmpty()
  shopName:string;
  @IsNotEmpty()
  shopLogo: string;
}