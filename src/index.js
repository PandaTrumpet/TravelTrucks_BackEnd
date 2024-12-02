import { initMongoDB } from "./db/initMongoDB.js";
import { startServer } from "./server.js";

const bootstrap = async () => {
  startServer();
  await initMongoDB();
};

bootstrap();
