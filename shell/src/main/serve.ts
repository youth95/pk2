import path from 'path';
import https from 'https';
import fs from 'fs';
import { parse } from 'url';

export function createServer(port = 8899): void {
  const options = {
    key: fs.readFileSync('./localhost-key.pem'),
    cert: fs.readFileSync('./localhost.pem')
  };
  console.log('createServer');
  https
    .createServer(options, (req, res) => {
      res.writeHead(200);
      try {
        const root = path.join(__dirname, '../../src/main/injects', parse(req.url ?? '').path ?? '');
      console.log('inject:', root);
      res.end(fs.readFileSync(root));
      } catch (error) {
        res.end()
      }
    })
    .listen(port, () => {
      console.log('started proxy server');
    });
}
