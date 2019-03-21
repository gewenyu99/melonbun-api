import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { Routes } from "./routes/routes";
import config from "./config";

class App {
  public app: express.Application;
  public mongoUrl: string = config.mongoUrl;
  public appRoutes: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.appRoutes.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }
}

export default new App().app;
