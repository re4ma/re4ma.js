import { ReServer } from './server/re-server.js';

let server = new ReServer(5000);
server.start();

console.log('http://localhost:5000/');