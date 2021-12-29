// import { Board } from "src/boards/board.entity";
import { Product } from "src/products/products.entity";
import { Shop } from "src/shops/shops.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['email'])
export class User extends BaseEntity{
  @PrimaryGeneratedColumn()
  id : number;
  @Column()
  email:string;
  @Column()
  password:string;
  @Column()
  userName:string;
  @Column()
  phone:string;

  @OneToMany(type => Shop,shops=>shops.user,{eager:true})
  shops:Shop[]
  @OneToMany(type => Product,products=>products.user,{eager:true})
  products:Product[]
}