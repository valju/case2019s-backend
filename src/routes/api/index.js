import express from "express";

import urgencyType from './urgencyType'
import eventType from "./eventType";
import user from "./user";
import locationType from './locationType';
import location from './location';
import area from './area';

const routes = express.Router();
routes.use('/urgencyType', urgencyType);
routes.use("/eventType", eventType);
routes.use("/user", user);
routes.use('/locationType', locationType);
routes.use('/location', location);
routes.use('/area', area);

export default routes;
