import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  orderBy:{
    shopName:'ASC'
  }
})
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  shopId: number;

  @Column()
  userId:number;

  @Column()
  shopName: string;
  
  @Column()
  shopLogo: string;

  @ManyToOne(type=>User,user=>user.shops,{eager:false})
  user:User;


}