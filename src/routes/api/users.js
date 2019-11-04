import express from 'express';
import knex from '../../db/index';

const users = express.Router();

// GET
/** http://localhost:8787/api/user/all  with method=GET **/

users.get('/all', function(req, res) {
  knex
    .select('name', 'description', 'defaultUrgency')
    .from('Users')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});

export default users;
