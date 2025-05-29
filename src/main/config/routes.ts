import { Express, Router } from "express";
import { UserRoutes } from "../routes/UserRoutes";

export default (app: Express): void => {

  const router = Router()

  UserRoutes.configureRoutes(router);

  app.use("/app", router);

}
