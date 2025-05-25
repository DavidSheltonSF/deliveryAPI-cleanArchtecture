import { Router } from "express";
import { adaptRegisterUserRoute } from "../../adapters/express/register-user";
import { makeRegisterUserController } from "../../factories/mongodb/user/make-register-user";

export default (router: Router): void => {
  router.post("/users", adaptRegisterUserRoute(makeRegisterUserController()))
}