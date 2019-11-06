import express from "express";

import urgencyType from './urgencyType'
import eventType from "./eventType";

const routes = express.Router();
routes.use('/urgencyType', urgencyType);
routes.use("/eventType", eventType);

export default routes;
