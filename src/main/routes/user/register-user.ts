import { Router } from "express";
import { adaptRegisterUserRoute } from "../../adapter/register-user";
import { makeRegisterUserController } from "../../factories/mongodb/user/make-register-user";
import { pathName } from "./path-name";

export default (router: Router): void => {
  router.post(pathName, adaptRegisterUserRoute(makeRegisterUserController()))
}