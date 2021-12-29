import { IsNotEmpty } from "class-validator";

export class createProductsDto{
  @IsNotEmpty()
  productsName:string;
  @IsNotEmpty()
  image: string;
  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  discountPrice: number;
  @IsNotEmpty()
  category: string;
 
  
}