import _ from "./_";
import express from "express";

const app = express();
app.disable("x-powered-by");
app.use(express.json());

const routes = express.Router();

require("./player").default(routes);
require("./team").default(routes);

app.use("/api", routes);

export default app;
