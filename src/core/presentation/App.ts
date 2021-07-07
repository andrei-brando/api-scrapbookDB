import express from "express";
import cors from 'cors';
import Database from "../data/connections/Database";
import NotesRoutes from "../../features/notes/routes/NotesRoutes";
import UserRoutes from "../../features/users/routes/UserRoutes";
import AuthRoutes from "../../features/authentication/routes/AuthRoutes";

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
    const userRoutes = new UserRoutes().init();
    const authRoutes = new AuthRoutes().init();

    this.#express.use(notesRoutes);
    this.#express.use(userRoutes);
    this.#express.use(authRoutes);
  }

  public start(port: any) {
    this.#express.listen(port, () => {
      console.log('API Rodando');
    });
  }
}