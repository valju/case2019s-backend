import express from "express";

import urgencyType from './urgencyType'
import eventType from "./eventType";
import users from "./users";

const routes = express.Router();
routes.use('/urgencyType', urgencyType);
routes.use("/eventType", eventType);
routes.use("/users", users);

export default routes;
