import { Router } from "express";
import NotesController from "../controller/NotesController";

export default class NotesRoutes {
  public init(): Router {
    const routes = Router();
    const controller = new NotesController();

    routes.get('/notes', controller.index);
    routes.get('/notes/:uid', controller.show);
    routes.post('/notes', controller.store);
    routes.put('/notes/:uid', controller.update);
    routes.delete('/notes/:uid', controller.delete);

    return routes;
  }
}