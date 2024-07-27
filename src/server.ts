/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import { Server } from 'http';
import app from './app';

// eslint-disable-next-line no-unused-vars
let server: Server;

function main() {
  server = app.listen(5000, () => {
    console.log(`Server is running successfully http://localhost:5000/`);
  });
}

main();
