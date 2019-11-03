import express from 'express';

import urgencyType from './urgencyType';
import locationType from './locationType';
import eventType from './eventType';
import area from './area';
import users from './users';

const routes = express.Router();
routes.use('/urgencyType', urgencyType);
routes.use('/locationType', locationType);
routes.use('/eventType', eventType);
routes.use('/area', area);
routes.use('/users', users);
export default routes;
