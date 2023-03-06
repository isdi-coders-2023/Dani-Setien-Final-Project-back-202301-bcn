import "./loadEnvironments.js";
import createDebug from "debug";
import connectDatabase from "./database/connectDatabase.js";
import { startServer } from "./server/startServer.js";

const debug = createDebug("bb:root");

const port = process.env.PORT! || 4000;

const mongoUrl = process.env.BRUSHBIDS_DATABASE!;

try {
  await startServer(Number(port));
  debug(`Server listening on port ${port}.`);

  await connectDatabase(mongoUrl);
  debug("Connected to database.");
} catch (error: unknown) {
  debug((error as Error).message);
}
