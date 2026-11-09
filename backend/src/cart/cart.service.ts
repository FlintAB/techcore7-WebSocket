import {
   Injectable,
   NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { AddCartItemDto } from './dto/add-cart-item.dto';
import { MergeCartDto } from './dto/merge-cart.dto';

@Injectable()
export class CartService {
   constructor(
      private readonly prisma: PrismaService,
   ) {}

   async findCart(userId: string) {
      const cart = await this.getOrCreateCart(userId);

      const items = await this.prisma.cartItem.findMany({
         where: {
            cartId: cart.id,
         },
         include: {
            product: true,
         },
      });

      return {
         items: items.map((item) => this.mapCartItem(item)),
      };
   }

   async addItem(userId: string, dto: AddCartItemDto) {
      const product = await this.prisma.product.findUnique({
         where: {
            id: dto.productId,
         },
      });

      if (!product) {
         throw new NotFoundException(
            `Product with ID ${dto.productId} not found`,
         );
      }

      const cart = await this.getOrCreateCart(userId);

      const item = await this.prisma.cartItem.upsert({
         where: {
            cartId_productId: {
               cartId: cart.id,
               productId: dto.productId,
            },
         },
         create: {
            cartId: cart.id,
            productId: dto.productId,
            quantity: 1,
         },
         update: {
            quantity: {
               increment: 1,
            },
         },
         include: {
            product: true,
         },
      });

      return this.mapCartItem(item);
   }

   private async getOrCreateCart(userId: string) {
      return this.prisma.cart.upsert({
         where: {
            userId,
         },
         create: {
            userId,
         },
         update: {},
      });
   }

   private mapCartItem(item: {
      product: {
         id: number;
         title: string;
         thumbnail: string;
         price: number;
      };
      quantity: number;
   }) {
      return {
         id: item.product.id,
         title: item.product.title,
         thumbnail: item.product.thumbnail,
         price: item.product.price,
         quantity: item.quantity,
      };
   }

async updateItem(
   userId: string,
   productId: number,
   quantity: number,
) {
   const cart = await this.getOrCreateCart(userId);

   const existingItem = await this.prisma.cartItem.findUnique({
      where: {
         cartId_productId: {
            cartId: cart.id,
            productId,
         },
      },
   });

   if (!existingItem) {
      throw new NotFoundException(
         `Product with ID ${productId} not found in cart`,
      );
   }

   if (quantity === 0) {
      await this.prisma.cartItem.delete({
         where: {
            cartId_productId: {
               cartId: cart.id,
               productId,
            },
         },
      });

      return {
         message: 'Product removed from cart',
      };
   }

   const item = await this.prisma.cartItem.update({
      where: {
         cartId_productId: {
            cartId: cart.id,
            productId,
         },
      },
      data: {
         quantity,
      },
      include: {
         product: true,
      },
   });

   return this.mapCartItem(item);
}

async removeItem(userId: string, productId: number) {
   const cart = await this.getOrCreateCart(userId);

   const existingItem = await this.prisma.cartItem.findUnique({
      where: {
         cartId_productId: {
            cartId: cart.id,
            productId,
         },
      },
   });

   if (!existingItem) {
      throw new NotFoundException(
         `Product with ID ${productId} not found in cart`,
      );
   }

   await this.prisma.cartItem.delete({
      where: {
         cartId_productId: {
            cartId: cart.id,
            productId,
         },
      },
   });

   return {
      message: 'Product removed from cart',
   };
}

async mergeCart(userId: string, dto: MergeCartDto) {
   const productIds = [
      ...new Set(dto.items.map((item) => item.productId)),
   ];

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

   const existingProductIds = new Set(
      products.map((product) => product.id),
   );

   const missingProductId = productIds.find(
      (id) => !existingProductIds.has(id),
   );

   if (missingProductId !== undefined) {
      throw new NotFoundException(
         `Product with ID ${missingProductId} not found`,
      );
   }

   const cart = await this.getOrCreateCart(userId);

   const items = await this.prisma.$transaction(async (tx) => {
      for (const item of dto.items) {
         await tx.cartItem.upsert({
            where: {
               cartId_productId: {
                  cartId: cart.id,
                  productId: item.productId,
               },
            },
            create: {
               cartId: cart.id,
               productId: item.productId,
               quantity: item.quantity,
            },
            update: {
               quantity: {
                  increment: item.quantity,
               },
            },
         });
      }

      return tx.cartItem.findMany({
         where: {
            cartId: cart.id,
         },
         include: {
            product: true,
         },
      });
   });

   return {
      items: items.map((item) => this.mapCartItem(item)),
   };
}
}