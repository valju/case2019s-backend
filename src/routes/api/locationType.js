import express from 'express';
import knex from '../../db/index';

const locationType = express.Router();

// GET ALL LOCATIONS
/** http://localhost:8787/api/locationType/:id  with method=GET **/

locationType.get('/all', function(req, res) {
  knex
    .select()
    .from('LocationType')
    .then((data) =>
      res
        .status(200)
        .send(data)
    )
    .catch((err) =>
      res
        .status(500)
        .send({ error: err.message })
    )
});


//GET BY LOCATION ID
// http://localhost:8787/api/locationType/:id  METHOD = GET
// Example: http://localhost:8787/api/locationType/10
locationType.get('/:id', function(req, res) {
  if (!isNaN(req.params.id) ) {
    knex
      .select()
      .from('LocationType')
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
/** http://localhost:8787/api/locationType/delete/:id  with method=GET    with method=DELETE **/
/** http://localhost:8787/api/locationType/delete/20**/

locationType.delete("/delete/:id", function(req, res) {
  knex("LocationType")
    .where("id", req.params.id)
    .del()
    .then(data => {
      if (data === 0) {
        res
          .status(404)
          .send("The column with id: " + req.params.id +" cant be deleted because it doesnt exist in the Database  " )
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
// CREATE locationType
//VALID LOCATION TYPES ARE HIGH, MEDIUM AND LOW
/** http://localhost:8787/api/locationType/create/ with method=POST **/

locationType.post('/create', function(req, res) {
  if (!req.body.name || !req.body.description) {
    res
      .status(400)
      .send('locationType name or description is missing!')
      .end();
  }  else{
    knex
      .insert(req.body)
      .into('LocationType')
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((error) => {
        if (error.errno == 1062) {
          // https://mariadb.com/kb/en/library/mariadb-error-codes/
          res
            .status(409)
            .send('locationType with that name already exists!')
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
/** http://localhost:8787/api/locationType/edit    with method=PUT **/
// example: http://localhost:8787/api/locationType/ (id in the body)

locationType.put('/edit', function(req, res) {
  if (!req.body.id || !req.body.name) {
    res
      .status(400)
      .send('locationType id or name are missing!')
      .end();
  } else {
    knex('LocationType')
      .where('id', req.body.id)
      .update(req.body)
      .then((data) => {
        if (data === 0) {
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


export default locationType;
