import { Router } from "express";
import UserController from "../controller/UserController";
import verifyAlreadyExistsUser from "../middlewares/verifyAlreadyExistsUser";

export default class UserRoutes {
  public init(): Router {
    const routes = Router();
    const controller = new UserController;

    // routes.get('/users', controller.index);
    // routes.get('/users/:email', controller.show);
    routes.post('/users', verifyAlreadyExistsUser, controller.store);
    // routes.put('/users/:uid', controller.update);
    // routes.delete('/users/:uid', controller.delete);

    return routes;
  }
}
