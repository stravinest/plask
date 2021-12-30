import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProductsCategory } from "./products-category-enum";

@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  productsId: number;

  @Column()
  shopId: number;

  @Column()
  userId: number;

  @Column()
  productsName: string;
  
  @Column()
  image: string;
  
  @Column()
  description: string;
  
  @Column()
  price: number;

  @Column()
  discountPrice: number;
  
  @Column()
  score: number;
 
  @Column()
  category: string;

  @ManyToOne(type=>User,user=>user.products,{eager:false})
  user:User;


}