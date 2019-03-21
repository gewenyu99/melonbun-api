import { Request, Response } from "express";
import { RequestController } from "../controllers/request.controller";

export class Routes {
  public requestController: RequestController = new RequestController();

  public routes(app): void {
    app.route("/").get((req: Request, res: Response) => {
      res.status(200).send({
        message: "GET request successfulll!!!!"
      });
    });

    app.route('/requests') 
      .get(this.requestController.getRequests)        
      .post(this.requestController.addNewRequest);

    app.route('/requests/:requestId')
      .get(this.requestController.getRequestById)
      .put(this.requestController.updateRequest)
      .delete(this.requestController.deleteRequest);
    }
}
