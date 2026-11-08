import { Prisma } from "../../../generated/prisma/client";

export type ProductWithCategory = Prisma.ProductGetPayload<{
   include: {
      category: true;
   };
}>;