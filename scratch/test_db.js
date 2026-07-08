import 'dotenv/config';
import prisma from '../src/config/db.js';

async function main() {
  const count = await prisma.product.count();
  console.log('Product count in DB:', count);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
