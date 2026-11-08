
import {
   Injectable,
   NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { ProductWithCategory } from './types/products.types';

@Injectable()
export class ProductsService {
   constructor(
      private readonly prisma: PrismaService,
   ) {}

   async findAll(query: PaginationQueryDto) {
      const { limit, skip } = query;

      const [products, total] = await Promise.all([
         this.prisma.product.findMany({
            skip,
            take: limit,
            include: {
               category: true,
            },
            orderBy: {
               id: 'asc',
            },
         }),

         this.prisma.product.count(),
      ]);

      return {
         products: products.map((product) => this.mapProduct(product)),
         total,
         skip,
         limit,
      };
   }

   async findOne(id: number) {
      const product = await this.prisma.product.findUnique({
         where: {
            id,
         },
         include: {
            category: true,
         },
      });

      if (!product) {
         throw new NotFoundException(
            `Product with ID ${id} not found`,
         );
      }

      return this.mapProduct(product);
   }

   async findAllCategories() {
      const categories = await this.prisma.category.findMany({
         orderBy: {
            name: 'asc',
         },
      });

      return categories.map((category) => ({
         slug: category.slug,
         name: category.name,
         url: `https://dummyjson.com/products/category/${category.slug}`,
      }));
   }

   async findByCategory(
      slug: string,
      query: PaginationQueryDto,
   ) {
      const { limit, skip } = query;

      const where = {
         category: {
            slug,
         },
      };

      const [products, total] = await Promise.all([
         this.prisma.product.findMany({
            where,
            skip,
            take: limit,
            include: {
               category: true,
            },
            orderBy: {
               id: 'asc',
            },
         }),

         this.prisma.product.count({
            where,
         }),
      ]);

      return {
         products: products.map((product) => this.mapProduct(product)),
         total,
         skip,
         limit,
      };
   }

   private mapProduct(product: ProductWithCategory) {
      return {
         id: product.id,
         title: product.title,
         description: product.description,
         category: product.category.slug,
         price: product.price,
         rating: product.rating,
         stock: product.stock,
         tags: product.tags,
         brand: product.brand,
         thumbnail: product.thumbnail,
      };
   }
}
