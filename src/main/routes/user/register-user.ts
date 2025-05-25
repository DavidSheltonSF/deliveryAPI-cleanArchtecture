import { Router } from "express";
import { routeAdapter } from "../../adapter/routeAdapter";
import { makeRegisterUserController } from "../../factories/mongodb/user/make-register-user";
import { pathName } from "./path-name";

export default (router: Router): void => {
  router.post(pathName, routeAdapter(makeRegisterUserController()))
}