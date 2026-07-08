import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const csvPath = './Ilaan Product Database for Website.xlsx - Products (1).csv';
const fileBuffer = fs.readFileSync(csvPath);

// Use native fetch to send multipart/form-data
const FormData = (await import('node:buffer')).Blob;

// Build boundary manually
const boundary = '----FormBoundary' + Math.random().toString(36).slice(2);
const fileName = path.basename(csvPath);
const mimeType = 'text/csv';

const header = `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${fileName}"\r\nContent-Type: ${mimeType}\r\n\r\n`;
const clearField = `\r\n--${boundary}\r\nContent-Disposition: form-data; name="clear"\r\n\r\nfalse\r\n--${boundary}--\r\n`;

const body = Buffer.concat([
  Buffer.from(header, 'utf8'),
  fileBuffer,
  Buffer.from(clearField, 'utf8')
]);

const res = await fetch('http://localhost:5000/api/products/import', {
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': body.length
  },
  body
});

const result = await res.json();
console.log('Import result:', JSON.stringify(result, null, 2));
