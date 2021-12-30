import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { ShopsRepository } from 'src/shops/shops.repository';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';

@Module({
  imports:[
    TypeOrmModule.forFeature([ProductsRepository]),
    TypeOrmModule.forFeature([ShopsRepository]),
    AuthModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
