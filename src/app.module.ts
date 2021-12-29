import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as config from 'config';
import { ShopsModule } from './shops/shops.module';
const dbConfig= config.get('db');
@Module({
  imports:[TypeOrmModule.forRoot({
    "type": dbConfig.type,
    "host": dbConfig.host,
    "port": dbConfig.port,
    "username": dbConfig.username,
    "password": dbConfig.password,
    "database": dbConfig.database,
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": dbConfig.synchronize
  }),ShopsModule,AuthModule],
})
export class AppModule {}
