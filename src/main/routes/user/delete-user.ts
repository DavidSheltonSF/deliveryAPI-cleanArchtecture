import { Router } from "express";
import { routeAdapter } from "../../adapter/routeAdapter";
import { makeDeleteUserController } from "../../factories/mongodb/user/make-delete-user";
import { pathName } from "./path-name";

export default (router: Router): void => {
  router.delete(`${pathName}/:id`, routeAdapter(makeDeleteUserController()))
}