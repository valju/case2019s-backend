import express from "express";

import urgencyType from './urgencyType'
import locationType from "./locationType";
import eventType from "./eventType";
import area from "./eventType";


const routes = express.Router();
routes.use('/locationType', locationType);
routes.use('/area', area);
routes.use('/eventType', eventType);
routes.use('/urgencyType', urgencyType);

export default routes;
