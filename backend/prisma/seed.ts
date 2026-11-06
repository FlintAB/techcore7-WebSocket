
import dotenv from 'dotenv';
import path from 'node:path';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { Pool } from 'pg';
import * as bcrypt from 'bcrypt';

dotenv.config({
  path: path.resolve(process.cwd(), '.env'),
});

console.log({
  hasDatabaseUrl: Boolean(process.env.DATABASE_URL),
  hasTestPassword: Boolean(process.env.TEST_USER_PASSWORD),
});

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
      where: { username: 'testuser' },
      update: { passwordHash },
      create: {
        username: 'testuser',
        passwordHash,
      },
    });

    console.log(`Test user ready: ${user.username}`);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
