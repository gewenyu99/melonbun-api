import app from "./app";
import config from "./config";

console.log('starting server...');

app.listen(config.port, () => {
  console.log("Express server listening on port " + config.port);
});
