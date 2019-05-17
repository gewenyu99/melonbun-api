import * as mongoose from 'mongoose';
import { RequestSchema } from '../models/request';
import { Request, Response } from 'express';

const RequestObj = mongoose.models.Request || mongoose.model('Request', RequestSchema);
export class RequestController {

  public addNewRequest (req: Request, res: Response) {                
    let newRequest = new RequestObj(req.body);

    newRequest.save((err, request) => {
      if (err) {
          res.send(err);
      }
      res.json(request);
    });
  }

  public getRequests (req: Request, res: Response) {           
    RequestObj.find({}, (err, request) => {
        if (err){
          res.send(err);
        }
        res.json(request);
    });
  }

  public getRequestById (req: Request, res: Response) {
    RequestObj.findById(req.params.requestId, (err, request) => {
      if (err) {
        res.send(err);
      }
      if (!request) {
        res.send({ message: "no request found!"});
      } else {
        res.json(request);
      }
    });
  }

  public updateRequest (req: Request, res: Response) {
    RequestObj.findOneAndUpdate(
      { _id: req.params.requestId },
      req.body,
      { new: true },
      (err, request) => {
        if (err) {
          res.send(err);
        }
        res.json(request);
      }
    );
  }

  public deleteRequest (req: Request, res: Response) {
    RequestObj.deleteOne({ _id: req.params.requestId }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted request!' });
    });
  }
}
