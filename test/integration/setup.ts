import * as  mongoose from 'mongoose';
import config from '../../lib/config';
import { Mockgoose } from 'mockgoose';
import Q from "q";
// import { Test } from './base';

let mockgoose = new Mockgoose(mongoose);
(<any>mongoose).Promise = Q.Promise;

async function mockgooseConnection() {
  // console.log("Preparing mockgoose data");
  await mockgoose.prepareStorage();
  mongoose.connect(config.mongoUrl, {useMongoClient: true})
  mongoose.connection.on('connected', () => {
    let models = mongoose.models;
    console.log('db connected', mongoose.models);
  });
  mongoose.connection.on('disconnected', function () {
    console.log('db disconnected');
  });

}

try {
  mockgooseConnection();
}
catch (error){
  console.log("Error while setting default connection", error);
}
