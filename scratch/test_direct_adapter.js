import 'dotenv/config';
import pkgPrisma from '@prisma/client';
const { PrismaClient } = pkgPrisma;
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const dbUrl = process.env.DATABASE_URL;
const urlPattern = /^(mysql|mariadb):\/\/([^:]*)(?::([^@]*))?@([^:/]+)(?::(\d+))?\/([^?]+)/;
const match = dbUrl.match(urlPattern);

if (match) {
  const [,, user, password, host, port, database] = match;
  
  const config = {
    host: host || 'localhost',
    port: port ? parseInt(port, 10) : 3306,
    user: user || 'root',
    password: password || '',
    database: database,
    connectionLimit: 5
  };

  console.log('Passing config to adapter:', config);
  const adapter = new PrismaMariaDb(config);
  const prisma = new PrismaClient({ adapter });

  const count = await prisma.product.count();
  console.log('Successfully queried products! Count:', count);
  await prisma.$disconnect();
} else {
  console.log('Failed to parse DATABASE_URL');
}
