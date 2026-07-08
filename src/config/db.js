import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error("DATABASE_URL is not set in environment variables");
}

// Parse connection URL
// Example: mysql://root:password@localhost:3306/ilaan_db
const urlPattern = /^(mysql|mariadb):\/\/([^:]*)(?::([^@]*))?@([^:/]+)(?::(\d+))?\/([^?]+)/;
const match = dbUrl.match(urlPattern);
if (!match) {
  throw new Error("Invalid DATABASE_URL format. Expected: mysql://user:password@host:port/database");
}

const [,, user, password, host, port, database] = match;

const adapter = new PrismaMariaDb({
  host: host || 'localhost',
  port: port ? parseInt(port, 10) : 3306,
  user: user || 'root',
  password: password || '',
  database: database,
  connectionLimit: 10,
});

const prisma = new PrismaClient({ adapter });

export default prisma;
