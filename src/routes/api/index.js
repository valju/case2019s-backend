import express from "express";

import urgencyType from './urgencyType'

const routes = express.Router();
routes.use('/urgencyType', urgencyType);

export default routes;
