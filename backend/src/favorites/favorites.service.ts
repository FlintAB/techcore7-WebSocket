import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { FavoriteItem } from './types/favorite-item.type';

@Injectable()
export class FavoritesService {
   constructor(
      private readonly prisma: PrismaService,
   ) {}

   async findAll(userId: string) {
      const favorites = await this.prisma.favorite.findMany({
         where: {
            userId,
         },
         include: {
            product: true,
         },
         orderBy: {
            createdAt: 'desc',
         },
      });

      return {
         items: favorites.map((favorite): FavoriteItem => ({
            id: favorite.product.id,
            title: favorite.product.title,
            thumbnail: favorite.product.thumbnail,
            price: favorite.product.price,
         })),
      };
   }

   async addFavorite(userId: string, productId: number): Promise<FavoriteItem> {
      const product = await this.prisma.product.findUnique({
         where: {
            id: productId,
         },
         select: {
            id: true,
            title: true,
            thumbnail: true,
            price: true,
         },
      });

      if (!product) {
         throw new NotFoundException('Product not found');
      }

      await this.prisma.favorite.upsert({
         where: {
            userId_productId: {
               userId,
               productId,
            },
         },
         create: {
            userId,
            productId,
         },
         update: {},
      });

      return product;
   }

async removeFavorite(userId: string, productId: number) {
   const favorite = await this.prisma.favorite.findUnique({
      where: {
         userId_productId: {
            userId,
            productId,
         },
      },
   });

   if (!favorite) {
      throw new NotFoundException('Favorite not found');
   }

   await this.prisma.favorite.delete({
      where: {
         userId_productId: {
            userId,
            productId,
         },
      },
   });

   return {
      message: 'Favorite removed successfully',
   };
}

async mergeFavorites(userId: string, productIds: number[]) {
   const products = await this.prisma.product.findMany({
      where: {
         id: {
            in: productIds,
         },
      },
      select: {
         id: true,
      },
   });

   if (products.length !== productIds.length) {
      throw new NotFoundException('One or more products not found');
   }

   await this.prisma.favorite.createMany({
      data: productIds.map((productId) => ({
         userId,
         productId,
      })),
      skipDuplicates: true,
   });

   return this.findAll(userId);
}
}