import {
    Body,
   Controller,
   Delete,
   Get,
   Param,
   ParseIntPipe,
   Post,
   Req,
   UseGuards,
} from '@nestjs/common';

import { FavoritesService } from './favorites.service';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import type { AuthenticatedRequest } from '../auth/types/authenticated-request';
import { MergeFavoritesDto } from './dto/merge-favorites.dto';

@Controller('favorites')
@UseGuards(AccessTokenGuard)
export class FavoritesController {
   constructor(
      private readonly favoritesService: FavoritesService,
   ) {}

   @Get()
   findAll(@Req() request: AuthenticatedRequest) {
      return this.favoritesService.findAll(request.user.sub);
   }

   @Post('merge')
   mergeFavorites(
      @Req() request: AuthenticatedRequest,
      @Body() dto: MergeFavoritesDto,
   ) {
      return this.favoritesService.mergeFavorites(
         request.user.sub,
         dto.productIds,
      );
   }

   @Post(':productId')
   addFavorite(
      @Req() request: AuthenticatedRequest,
      @Param('productId', ParseIntPipe) productId: number,
   ) {
      return this.favoritesService.addFavorite(
         request.user.sub,
         productId,
      );
   }

   @Delete(':productId')
   removeFavorite(
      @Req() request: AuthenticatedRequest,
      @Param('productId', ParseIntPipe) productId: number,
   ) {
      return this.favoritesService.removeFavorite(
         request.user.sub,
         productId,
      );
   }
}