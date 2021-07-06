import express from "express";
import cors from 'cors';
import Database from "../data/connections/Database";
import NotesRoutes from "../../features/notes/routes/NotesRoutes";

export default class App {
  readonly #express: express.Application;

  constructor() {
    this.#express = express();
  }

  public async init() {
    this.config();
    this.middlewares();
    this.routes();
    await this.database();
  }

  private async database() {
    await new Database().openConnection();
  }

  private config() {
    this.#express.use(express.json());
    this.#express.use(express.urlencoded({ extended: false }));
    this.#express.use(cors());
  }

  private middlewares() {
    // TODO
  }

  private routes() {
    const notesRoutes = new NotesRoutes().init();

    this.#express.use(notesRoutes);
  }

  public start(port: any) {
    this.#express.listen(port, () => {
      console.log('API Rodando');
    });
  }
}