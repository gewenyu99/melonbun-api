import * as mongoose from 'mongoose';
import { RequestSchema } from '../models/request';
import { Request, Response } from 'express';

const Request = mongoose.model('Request', RequestSchema);
export class RequestController {

  public addNewRequest (req: Request, res: Response) {                
    let newRequest = new Request(req.body);

    newRequest.save((err, request) => {
      if (err){
          res.send(err);
      }    
      res.json(request);
    });
  }

  public getRequests (req: Request, res: Response) {           
    Request.find({}, (err, request) => {
        if (err){
          res.send(err);
        }
        res.json(request);
    });
  }

  public getRequestById (req: Request, res: Response) {
    Request.findById(req.params.requestId, (err, request) => {
      if (err) {
        res.send(err);
      }
      res.json(request);
    });
  }

  public updateRequest (req: Request, res: Response) {
    Request.findOneAndUpdate(
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
    Request.deleteOne({ _id: req.params.contactId }, (err) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Successfully deleted request!' });
    });
  }
}