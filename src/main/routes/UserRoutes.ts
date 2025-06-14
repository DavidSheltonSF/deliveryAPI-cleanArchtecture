import { Router } from "express";
import { adaptExpress } from "../adapter/express/express-route-adapter";
import { UserControllerFactory } from "../factories/mongodb/user/UserControllerFactory";

export class UserRoutes {
  private static pathName = "/users";

  static configureRoutes(router: Router): void {
    router.post(this.pathName, adaptExpress(UserControllerFactory.makeRegisterUserController()));
    router.put(this.pathName + "/:id", adaptExpress(UserControllerFactory.makeUpdateUserController()));
    router.delete(this.pathName + "/:id", adaptExpress(UserControllerFactory.makeDeleteUserController()));
    router.get(this.pathName, adaptExpress(UserControllerFactory.makeFindAllUsersController()));
    router.get(this.pathName + "/id/:id", adaptExpress(UserControllerFactory.makeFindUserByIdController()));
    router.get(this.pathName + "/email/:email", adaptExpress(UserControllerFactory.makeFindUserByEmailController()));
  }
}