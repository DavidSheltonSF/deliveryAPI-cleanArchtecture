import { Router } from "express";
import { routeAdapter } from "../adapter/routeAdapter";
import { UserControllerFactory } from "../factories/mongodb/user/UserControllerFactory";

export class UserRoutes {
  private static pathName = "/users";

  static configureRoutes(router: Router): void {
    router.post(this.pathName, routeAdapter(UserControllerFactory.makeRegisterUserController()));
    router.put(this.pathName + "/:id", routeAdapter(UserControllerFactory.makeUpdateUserController()));
    router.delete(this.pathName + "/:id", routeAdapter(UserControllerFactory.makeDeleteUserController()));
    router.get(this.pathName, routeAdapter(UserControllerFactory.makeFindAllUsersController()));
    router.get(this.pathName + "/id/:id", routeAdapter(UserControllerFactory.makeFindUserByIdController()));
    router.get(this.pathName + "/email/:email", routeAdapter(UserControllerFactory.makeFindUserByEmailController()));
  }
}