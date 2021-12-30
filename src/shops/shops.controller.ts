import { Body, Controller, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { createShopsDto } from './dto/create-shops.dto';
import { Shop } from './shops.entity';
import { ShopsService } from './shops.service';

@Controller('shops')

export class ShopsController {
  constructor(private shopsService:ShopsService){}
  @Get('/search')
  getSearchName(@Query('name') name:string ):Promise<Shop[]>{
    return this.shopsService.getSearchName(name);
  }

  @Get('/:shopsId')
  getShopsById(@Param('shopsId') shopsId: number) : Promise<{}>{
    return this.shopsService.getShopsById(shopsId)
  }
  @Get('/')
  getAllShops(@Query('page') page:number ):Promise<Shop[]>{
    return this.shopsService.getAllShops(page);
  }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createShop(
    @Body() createShopsDto: createShopsDto,
    @GetUser() user:User):Promise<{}> {
    return this.shopsService.createShop(createShopsDto,user)
    
  }

}
