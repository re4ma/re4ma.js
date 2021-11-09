import http from 'http';
import url from 'url';
import fs from 'fs';
import path from 'path';

import { MIME_MAP } from './MIME_MAP.js';

export class ReServer {

  constructor(port = 9000) {
    this.port = port;
    this._server = http.createServer((request, response) => {
      let parsedUrl = url.parse(request.url);
      let filePath = '.' + parsedUrl.pathname;
      let fileExt = path.parse(filePath).ext;
      fs.stat(filePath, {bigint: false}, (err, stat) => {
        if (err) {
          response.statusCode = 404;
          response.end('File not found: ' + filePath);
          return;
        } 
        if (fs.statSync(filePath).isDirectory()) {
          filePath += 'index.html';
          fileExt = '.html';
        }
      
        fs.readFile(filePath, {}, (err, /** @type {Buffer | String} */ data) => {
          if (err) {
            console.log(filePath);
            response.statusCode = 500;
            response.end('Internal Server Error');
            return;
          }
          response.setHeader('Content-type', MIME_MAP[fileExt] || 'text/plain');
          response.end(data);
        });
      });
    });
  }

  start() {
    this.cfg = JSON.parse(fs.readFileSync('./project.json').toString());
    console.log(this.cfg);
    this._server.listen(this.cfg.serve.port || this.port);
  }

  stop() {
    this._server.close((err) => {
      console.log(err);
    });
  }

}