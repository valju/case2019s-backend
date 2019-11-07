import express from "express";

import urgencyType from './urgencyType'
import eventType from "./eventType";
import user from "./user";

const routes = express.Router();
routes.use('/urgencyType', urgencyType);
routes.use("/eventType", eventType);
routes.use("/user", user);

export default routes;
