const https = require('https');

const url = 'https://www.swifttranslator.com/';
https.get(url, (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers['content-type']);
  res.on('data', (d) => {});
  res.on('end', () => process.exit(0));
}).on('error', (e) => {
  console.error('error:', e.message);
  process.exit(1);
});