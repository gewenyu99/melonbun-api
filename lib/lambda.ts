import * as awsServerlessExpress from 'aws-serverless-express';
import App from './app';

const server = awsServerlessExpress.createServer(App);

export function handler(event, context) {
  awsServerlessExpress.proxy(server, event, context);
}
