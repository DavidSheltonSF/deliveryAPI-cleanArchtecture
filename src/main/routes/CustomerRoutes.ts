import { Router } from "express";
import { adaptExpress } from "../adapter/express/express-route-adapter";
import { CustomerControllerFactory } from "../factories/mongodb/customer/CustomerControllerFactory";

export class CustomerRoutes {
  private static pathName = "/customers";

  static configureRoutes(router: Router): void {
    router.post(this.pathName, adaptExpress(CustomerControllerFactory.makeCreateCustomerController()));
  //   router.put(this.pathName + "/:id", adaptExpress(CustomerControllerFactory.makeUpdateCustomerController()));
  //   router.delete(this.pathName + "/:id", adaptExpress(CustomerControllerFactory.makeDeleteCustomerController()));
  //   router.get(this.pathName, adaptExpress(CustomerControllerFactory.makeFindAllCustomersController()));
  //   router.get(this.pathName + "/id/:id", adaptExpress(CustomerControllerFactory.makeFindCustomerByIdController()));
  //   router.get(this.pathName + "/email/:email", adaptExpress(CustomerControllerFactory.makeFindCustomerByEmailController()));
  }
}