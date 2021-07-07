import { Router } from "express";
import AuthController from "../controllers/AuthController";

export default class AuthRoutes {
  public init(): Router {
    const routes = Router();
    const controller = new AuthController;

    routes.post('/login/:email', controller.store);

    return routes;
  }
}
