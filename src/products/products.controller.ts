import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { query } from 'express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { createProductsDto } from './dto/create-products.dto';
import { Product } from './products.entity';
import { ProductsService } from './products.service';

@Controller('shops')

export class ProductsController {
  constructor(private productsService:ProductsService){}
 
  @Post('/:shopId/products')
  @UseGuards(AuthGuard())
  createProduct(
    @Param('shopId', ParseIntPipe) shopId:number,
    @Body() createProductsDto: createProductsDto,
    @GetUser() user:User):Promise<{}>{
    return this.productsService.createProduct(shopId,createProductsDto,user)
  }

  @Delete('/products/:productsId')
  @UseGuards(AuthGuard())
  deleteProduct(
    // @Param('shopId', ParseIntPipe) shopId:number,
    @Param('productsId', ParseIntPipe) productsId:number,
    @GetUser() user:User):Promise<{}>{
    return this.productsService.deleteProduct(productsId,user);
  }

  @Get('/:shopId/products/:productsId')
  getProductById(@Param() param) {
    return this.productsService.getProductById(param.shopId,param.productsId)
  }

  @Get('/:shopId/products/low')
  getAllProductsLow(
    @Query() query,
    @Param('shopId') shopId: number){
    return this.productsService.getAllProductsLow(query.page,query.size,shopId);
  } 
  @Get('/:shopId/products/high')
  getAllProductsHigh(
    @Query() query,
    @Param('shopId') shopId: number){
    return this.productsService.getAllProductsHigh(query.page,query.size,shopId);
  } 
  @Get('/:shopId/products/score')
  getAllProductsScore(
    @Query() query,
    @Param('shopId') shopId: number){
    return this.productsService.getAllProductsScore(query.page,query.size,shopId);
  } 
  @Get('/:shopId/products/new')
  getAllProductsNew(
    @Query() query,
    @Param('shopId') shopId: number){
    return this.productsService.getAllProductsNew(query.page,query.size,shopId);
  }

  @Get('/:shopId/products')
  getProductsCategory(
    @Query() query,
    @Param('shopId') shopId: number){
    return this.productsService.getProductsCategory(query.category,shopId);
  } 
}
