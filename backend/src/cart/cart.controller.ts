import {
   Body,
   Controller,
   Delete,
   Get,
   Param,
   ParseIntPipe,
   Patch,
   Post,
   Req,
   UseGuards,
} from '@nestjs/common';

import { CartService } from './cart.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { MergeCartDto } from './dto/merge-cart.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request';

@Controller('cart')
@UseGuards(AccessTokenGuard)
export class CartController {
   constructor(
      private readonly cartService: CartService,
   ) {}

   @Get()
   findCart(@Req() request: AuthenticatedRequest) {
      return this.cartService.findCart(request.user.sub);
   }

   @Post('items')
   addItem(
      @Req() request: AuthenticatedRequest,
      @Body() dto: AddCartItemDto,
   ) {
      return this.cartService.addItem(request.user.sub, dto);
   }

   @Patch('items/:productId')
   updateItem(
      @Req() request: AuthenticatedRequest,
      @Param('productId', ParseIntPipe) productId: number,
      @Body() dto: UpdateCartItemDto,
   ) {
      return this.cartService.updateItem(
         request.user.sub,
         productId,
         dto.quantity,
      );
   }

   @Delete('items/:productId')
   removeItem(
      @Req() request: AuthenticatedRequest,
      @Param('productId', ParseIntPipe) productId: number,
   ) {
      return this.cartService.removeItem(
         request.user.sub,
         productId,
      );
   }

   @Post('merge')
   mergeCart(
      @Req() request: AuthenticatedRequest,
      @Body() dto: MergeCartDto,
   ) {
      return this.cartService.mergeCart(
         request.user.sub,
         dto,
      );
   }
}