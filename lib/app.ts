import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as swaggerUI from "swagger-ui-express";

import swaggerDoc = require("./swagger.json");
import { Routes } from "./routes/routes";
import config from "./config";
import { DummyData } from "./utils/dummyData";

class App {
  public app: express.Application = express();
  public mongoUrl: string = config.mongoUrl;
  public appRoutes: Routes = new Routes();
  public isDBPopulated: boolean = false;

  constructor() {
    this.config();
    this.appRoutes.routes(this.app);
    this.mongoSetup();
    this.setUpSwagger();
    
    if (!this.isDBPopulated) {
      this.populateDB();
    }
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise;
    mongoose.connect(this.mongoUrl);
  }

  private setUpSwagger(): void {
    this.app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));
  }

  private populateDB(): void {
    const dummy = new DummyData(10);
    dummy.populateDB();
    this.isDBPopulated = true;
  }
}

export default new App().app;
