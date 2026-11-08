
import dotenv from 'dotenv';
import path from 'node:path';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

dotenv.config({
   path: path.resolve(process.cwd(), '.env'),
});

interface DummyCategory {
   slug: string;
   name: string;
   url: string;
}

interface DummyProduct {
   id: number;
   title: string;
   description: string;
   category: string;
   price: number;
   rating: number;
   stock: number;
   tags: string[];
   brand?: string | null;
   thumbnail: string;
}

interface DummyProductsResponse {
   products: DummyProduct[];
   total: number;
   skip: number;
   limit: number;
}

async function main() {
   const connectionString = process.env.DATABASE_URL;
   const password = process.env.TEST_USER_PASSWORD;

   if (!connectionString || !password) {
      throw new Error(
         'DATABASE_URL and TEST_USER_PASSWORD must be set',
      );
   }

   const pool = new Pool({ connectionString });
   const prisma = new PrismaClient({
      adapter: new PrismaPg(pool),
   });

   try {
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await prisma.user.upsert({
         where: {
            username: 'testuser',
         },
         update: {
            passwordHash,
         },
         create: {
            username: 'testuser',
            passwordHash,
         },
      });

      console.log(`Test user ready: ${user.username}`);

      // Получаем категории и товары из DummyJSON
      const [categoriesResponse, productsResponse] = await Promise.all([
         fetch('https://dummyjson.com/products/categories'),
         fetch('https://dummyjson.com/products?limit=50'),
      ]);

      if (!categoriesResponse.ok || !productsResponse.ok) {
         throw new Error('Failed to fetch catalog from DummyJSON');
      }

      const categories: DummyCategory[] = await categoriesResponse.json();

      const productsData: DummyProductsResponse =
         await productsResponse.json();

      // Создаём категории и сохраняем их ID
      const categoryIds = new Map<string, number>();

      for (const category of categories) {
         const savedCategory = await prisma.category.upsert({
            where: {
               slug: category.slug,
            },
            update: {
               name: category.name,
            },
            create: {
               slug: category.slug,
               name: category.name,
            },
         });

         categoryIds.set(category.slug, savedCategory.id);
      }

      console.log(`Categories ready: ${categories.length}`);

      // Создаём или обновляем товары
      for (const product of productsData.products) {
         const categoryId = categoryIds.get(product.category);

         if (!categoryId) {
            throw new Error(
               `Category not found for product ${product.id}: ${product.category}`,
            );
         }

         await prisma.product.upsert({
            where: {
               id: product.id,
            },
            update: {
               title: product.title,
               description: product.description,
               categoryId,
               price: product.price,
               rating: product.rating,
               stock: product.stock,
               tags: product.tags ?? [],
               brand: product.brand ?? '',
               thumbnail: product.thumbnail,
            },
            create: {
               id: product.id,
               title: product.title,
               description: product.description,
               categoryId,
               price: product.price,
               rating: product.rating,
               stock: product.stock,
               tags: product.tags ?? [],
               brand: product.brand ?? '',
               thumbnail: product.thumbnail,
            },
         });
      }

      console.log(`Products ready: ${productsData.products.length}`);
   } finally {
      await prisma.$disconnect();
      await pool.end();
   }
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
});
