import express from "express";
import setupRoutes from "./routes";
import setupMiddlewares from "./middlewares";

const app = express();
setupMiddlewares(app);
console.log("Express middlewares are ready");
setupRoutes(app);
console.log('Express routes are ready');
export default app;