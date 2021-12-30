import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query, Req, Res, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { createProductsDto } from './dto/create-products.dto';
import { ProductsService } from './products.service';
import * as multerS3 from 'multer-s3';
import * as AWS from 'aws-sdk';
import { FilesInterceptor } from '@nestjs/platform-express';

const s3 = new AWS.S3()

@Controller('shops')

export class ProductsController {
  constructor(private productsService:ProductsService){}
  @Post('/image')
  @UseInterceptors(FilesInterceptor('images', 3, {
    storage: multerS3({
      s3: s3,
      bucket: 'plask',
      acl: 'public-read',
      key: function(req, file, cb) {
        cb(null, file.originalname)
      }
    })
  }))
  async uploadImage(@UploadedFiles() file: Express.Multer.File) {
    console.log(file)
    return this.productsService.uploadImage(file);
  }

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

    @Param('productsId', ParseIntPipe) productsId:number,
    @GetUser() user:User):Promise<{}>{
    return this.productsService.deleteProduct(productsId,user);
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

  @Get('/:shopId/products/:productsId')
  getProductById(@Param() param) {
    return this.productsService.getProductById(param.shopId,param.productsId)
  }

  
}
