import express from "express";

import urgencyType from './urgencyType'
import eventType from "./eventType";
import user from "./user";
import locationType from './locationType';

const routes = express.Router();
routes.use('/urgencyType', urgencyType);
routes.use("/eventType", eventType);
routes.use("/user", user);
routes.use('/locationType', locationType);

export default routes;
