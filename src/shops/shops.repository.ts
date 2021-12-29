import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { createShopsDto } from "./dto/create-shops.dto";
import { Shop } from "./shops.entity";

@EntityRepository(Shop)
export class ShopsRepository extends Repository<Shop>{

  async createShops(createShopsDto:createShopsDto,user:User):Promise<Shop>{
    const {shopName,shopLogo} = createShopsDto;
    const shop = this.create({
      shopName,
      shopLogo,
      user
    })
    await this.save(shop);
    return shop
  }


}