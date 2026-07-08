import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('DATABASE_URL is not set in environment variables');
}

const parsedUrl = new URL(dbUrl);
const adapter = new PrismaMariaDb({
  host: parsedUrl.hostname,
  port: parsedUrl.port ? Number(parsedUrl.port) : 3306,
  user: decodeURIComponent(parsedUrl.username || 'root'),
  password: decodeURIComponent(parsedUrl.password || ''),
  database: parsedUrl.pathname.replace(/^\/+/, ''),
  connectionLimit: 5,
  ssl: { rejectUnauthorized: false },
});

const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});

export default prisma;
