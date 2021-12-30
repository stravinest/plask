import { BadRequestException } from "@nestjs/common";
import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { createProductsDto } from "./dto/create-products.dto";
import { ProductsCategory } from "./products-category-enum";
import { Product } from "./products.entity";

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product>{

  async createProduct(shopId:number,createProductsDto:createProductsDto,user:User):Promise<{}>{
    const score = Math.floor(Math.random() * 10);
    const { productsName,image,description,price,discountPrice,category} = createProductsDto;
    if(category=="male"|| category=="female" ||category=="child"){
      const product = this.create({
        productsName,
        image,
        description,
        price,
        discountPrice,
        category,
        user,
        shopId,
        score
      })
      await this.save(product);
      return {result:"success"}
    }
    throw new BadRequestException(`${category} isn't in the category oprions`)
    
  }
}