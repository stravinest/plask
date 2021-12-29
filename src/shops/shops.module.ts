import { Module } from '@nestjs/common';
import { ShopsService } from './shops.service';
import { ShopsController } from './shops.controller';
import { ShopsRepository } from './shops.repository';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[
    TypeOrmModule.forFeature([ShopsRepository]),
    AuthModule
  ],
  providers: [ShopsService],
  controllers: [ShopsController]
})
export class ShopsModule {}
