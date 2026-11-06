import {
   Injectable,
   NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
   constructor(private readonly prisma: PrismaService) {}

   async getProfile(userId: string) {
      const user = await this.prisma.user.findUnique({
         where: {
            id: userId,
         },
         select: {
            id: true,
            username: true,
            email: true,
            firstName: true,
            lastName: true,
            image: true,
            createdAt: true,
         },
      });

      if (!user) {
         throw new NotFoundException('User not found');
      }

      return user;
   }
}