import express from 'express';
import knex from '../../db/index';

const eventType = express.Router();

// GET
/** http://localhost:8787/api/eventType/all with method=GET **/

eventType.get('/all', function(req, res) {
  knex
    .select()
    .from('EventType')
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json({ error: err.message }));
});


//GET BY CATEGORY
// http://localhost:8787/api/eventType/:id  METHOD = GET
// Example: http://localhost:8787/api/eventType/10
eventType.get('/:id', function(req, res) {
  if (!isNaN(req.params.id) ) {
    knex
      .select()
      .from('EventType')
      .where('id', req.params.id)
      .then((data) => {
        res
          .status(200)
          .send(data)
          .end();

      })
      .catch((error) => {
        res
          .status(500)
          .send('Database error error no: ' + error.errno)
          .end();
      });
  } else {
    res
      .status(400)
      .send('Invalid request!')
      .end();
  }
});

// DELETE ONE
/** http://localhost:8787/api/eventType/delete/:id  with method=GET    with method=DELETE **/
/** http://localhost:8787/api/eventType/delete/20**/

eventType.delete("/delete/:id", function(req, res) {
  knex("EventType")
    .where("id", req.params.id)
    .del()
    .then(data => {
      if (data == 0) {
        res
          .status(404)
          .send("Invalid row number: " + req.params.id)
          .end();
      } else {
        res
          .status(200)
          .send("Delete successful! Count of deleted rows: " + data)
          .end();
      }
    })
    .catch(error => {
      res
        .status(500)
        .send("Database error: " + error.errno)
        .end();
    });
});
// CREATE eventType
/** http://localhost:8787/api/eventType/create/ with method=POST **/

eventType.post('/create', function(req, res) {
  let validUrgencyId = [
    10, 20, 30
  ];
  let validUrgencyName = [
    "low", "medium", "high"
  ];
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .send('eventType name or description is missing!')
      .end();
  } else if(req.body.id !== validUrgencyId || req.body.name !== validUrgencyName ) {
    res
      .status(400)
      .send('Not a valid eventType')
      .end();
  } else{
    knex
      .insert(req.body)
      .into('EventType')
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((error) => {
        if (error.errno == 1062) {
          // https://mariadb.com/kb/en/library/mariadb-error-codes/
          res
            .status(409)
            .send('eventType with that name already exists!')
            .end();
        } else {
          res
            .status(500)
            .send('Database error: ' + error.errno)
            .end();
        }
      });
  }
});

// EDIT ONE
/** http://localhost:8787/api/category/    with method=PUT **/
// example: http://localhost:8787/api/category (id in the body)

eventType.put('/edit', function(req, res) {
  if (!req.body.id || !req.body.name) {
    res
      .status(400)
      .send('eventType id or name are missing!')
      .end();
  } else {
    knex('EventType')
      .where('id', req.body.id)
      .update(req.body)
      .then((data) => {
        if (data == 0) {
          res
            .status(404)
            .send('Invalid row number: ' + req.body.id)
            .end();
        } else {
          res
            .status(200)
            .send('Update successful! Count of modified rows: ' + data)
            .end();
        }
      })
      .catch((error) => {
        res
          .status(500)
          .send('Database error: ' + error.errno)
          .end();

      });
  }
});


export default eventType;
