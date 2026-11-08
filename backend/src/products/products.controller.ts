import {
   Controller,
   Get,
   Query,
   Param,
   ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@Controller('products')
export class ProductsController {
   constructor(
      private readonly productsService: ProductsService,
   ) {}

   @Get()
   findAll(@Query() query: PaginationQueryDto) {
      return this.productsService.findAll(query);
   }

   @Get('categories')
   findAllCategories() {
      return this.productsService.findAllCategories();
   }

   @Get('category/:slug')
   findByCategory(
      @Param('slug') slug: string,
      @Query() query: PaginationQueryDto,
   ) {
      return this.productsService.findByCategory(slug, query);
   }

   @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number) {
      return this.productsService.findOne(id);
   }
}
