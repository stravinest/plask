import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { skip, take } from 'rxjs';
import { User } from 'src/auth/user.entity';
import { UserRepository } from 'src/auth/user.repository';
import { createQueryBuilder, getRepository } from 'typeorm';
import { createShopsDto } from './dto/create-shops.dto';
import { Shop } from './shops.entity';
import { ShopsRepository } from './shops.repository';

@Injectable()
export class ShopsService {
  constructor(
    @InjectRepository(ShopsRepository)
    private shopsRepository:ShopsRepository,
  ){}

  async getShopsById(shopId:number):Promise<{}>{
    const found = await this.shopsRepository.findOne(shopId)
    const shop = await createQueryBuilder('Shop')
    .leftJoinAndSelect('Shop.user', 'user')
    .where('Shop.shopId = :shopId', { shopId:shopId  })
    .getOne();
  
    if(!shop){
      throw new NotFoundException(`can't ${shopId}`);
    }
    return shop
  }

  async getAllShops(page:number):Promise<Shop[]>{
    return this.shopsRepository.find({
      take:5,
      skip:5*(page-1)

    });
  }

  createShop(createShopsDto:createShopsDto,user:User): Promise<Shop>{
    return this.shopsRepository.createShops(createShopsDto,user);
  }

}
