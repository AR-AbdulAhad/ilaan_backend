import 'dotenv/config';

const dbUrl = process.env.DATABASE_URL;
const urlPattern = /^(mysql|mariadb):\/\/([^:]*)(?::([^@]*))?@([^:/]+)(?::(\d+))?\/([^?]+)/;
const match = dbUrl.match(urlPattern);

if (match) {
  const [,, user, password, host, port, database] = match;
  console.log('Match details:', {
    user,
    password,
    host,
    port,
    database
  });
} else {
  console.log('No match for:', dbUrl);
}
