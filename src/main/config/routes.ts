import { Express, Router } from "express";
import routes from "./../routes"

export default (app: Express): void => {

  const router = Router()

  routes.forEach((route) => {
    route(router)
  })


  app.use("/app", router);
  
  console.log('ROUTER IS READY');
}
