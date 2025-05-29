import express from "express";
import setupRoutes from "./routes";
import setupMiddlewares from "./middlewares";

const app = express();
setupMiddlewares(app);
console.log("Middlwares are ready");
setupRoutes(app);
console.log("Routes are ready");
export default app;