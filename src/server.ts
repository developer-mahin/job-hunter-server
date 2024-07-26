import { Server } from "http";
import app from "./app";

let server: Server;

function main() {
  server = app.listen(5000, () => {
    console.log(`Server is running successfully http://localhost:5000/`);
  });
}

main();
