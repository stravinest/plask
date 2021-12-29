import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { ShopsRepository } from 'src/shops/shops.repository';
import { createQueryBuilder } from 'typeorm';
import { createProductsDto } from './dto/create-products.dto';
import { ProductsCategory } from './products-category-enum';
import { Product } from './products.entity';
import { ProductsRepository } from './products.repository';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsRepository)
    private productsRepository:ProductsRepository,
    @InjectRepository(ShopsRepository)
    private shopsRepository:ShopsRepository,
  ){}
  async createProduct(shopId:number,createProductsDto:createProductsDto,user:User):Promise<{}>{
    const isShop =await this.shopsRepository.findOne(shopId);
    if(!isShop){
      throw new NotFoundException(`찾을수 없습니다. ${shopId}`)
    }
    return this.productsRepository.createProduct(shopId,createProductsDto,user)
  }
  
  async deleteProduct(productsId:number,user:User):Promise<{}>{
    const product =await this.productsRepository.findOne(productsId);
    if(!product){
      throw new NotFoundException(`찾을수 없습니다. ${productsId}`)
    }

    if(user.id!==product.userId){
      throw new UnauthorizedException();
    }
      const result = await this.productsRepository.delete(productsId);
      if(result.affected===0){
        throw new NotFoundException(`찾을수 없습니다. ${productsId}`)
      }
      console.log('result',result)
      return {result:"delete success"}
    
  }

  async getAllProductsLow(page:number,size:number,shopId:number){
    if(!size){
      const product = await this.productsRepository.find({
        where:{
          shopId:shopId
        },
        order:{
          price:'ASC'
        },
        take:10,
        skip:10*(page-1)

      })
      return product
    }else{
      const product = await this.productsRepository.find({
        where:{
          shopId:shopId
        },
        order:{
          price:'ASC'
        },
        take:size,
        skip:size*(page-1)

      })
      return product
    }
    
  }
  async getAllProductsHigh(page:number,size:number,shopId:number){
    if(!size){
      const product = await this.productsRepository.find({
        where:{
          shopId:shopId
        },
        order:{
          price:'DESC'
        },
        take:10,
        skip:10*(page-1)

      })
      return product
    }else{
      const product = await this.productsRepository.find({
        where:{
          shopId:shopId
        },
        order:{
          price:'DESC'
        },
        take:size,
        skip:size*(page-1)

      })
      return product
    }
  }
  async getAllProductsScore(page:number,size:number,shopId:number){
    if(!size){
      const product = await this.productsRepository.find({
        where:{
          shopId:shopId
        },
        order:{
          score:'DESC'
        },
        take:10,
        skip:10*(page-1)

      })
      return product
    }else{
      const product = await this.productsRepository.find({
        where:{
          shopId:shopId
        },
        order:{
          score:'DESC'
        },
        take:size,
        skip:size*(page-1)

      })
      return product
    }
  }
  async getAllProductsNew(page:number,size:number,shopId:number){
    if(!size){
      const product = await this.productsRepository.find({
        where:{
          shopId:shopId
        },
        order:{
          productsId:'ASC'
        },
        take:10,
        skip:10*(page-1)

      })
      return product
    }else{
      const product = await this.productsRepository.find({
        where:{
          shopId:shopId
        },
        order:{
          productsId:'ASC'
        },
        take:size,
        skip:size*(page-1)

      })
      return product
    }
  }
  async getProductsCategory(category:string,shopId:number){
    return await this.productsRepository.find({
      where:{
        shopId:shopId,
        category:category
      }
    })

  }

  async getProductById(shopId:number,productsId:number){
    return await this.productsRepository.find({
      where:{
        shopId:shopId,
        productsId:productsId
      }
    })
  }
}

