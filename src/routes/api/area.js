import express from 'express';
import knex from '../../db/index';

const area = express.Router();

// GET ALL LOCATIONS
/** http://localhost:8787/api/area/:id  with method=GET **/

area.get('/all', function(req, res) {
  knex
    .select()
    .from('Area')
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


//GET BY Area ID
// http://localhost:8787/api/area/:id  METHOD = GET
// Example: http://localhost:8787/api/area/101
area.get('/:id', function(req, res) {
  if (!isNaN(req.params.id) ) {
    knex
      .select()
      .from('Area')
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
/** http://localhost:8787/api/area/delete/:id  with method=GET    with method=DELETE **/
/** http://localhost:8787/api/area/delete/20**/

area.delete("/delete/:id", function(req, res) {
  knex("Area")
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
// CREATE area
//VALID Area TYPES ARE HIGH, MEDIUM AND LOW

/** http://localhost:8787/api/area/create/ with method=POST **/

area.post('/create', function(req, res) {

  if (!req.body.name || !req.body.description ) {
    res
      .status(400)
      .send('area name or description is missing!')
      .end();
  }/* else if( req.body.isCommonArea !== 0 || req.body.isCommonArea !== 1) {
    res
    .status(400)
      .send('isCommonArea should be boolean'+ req.body.description)
      .end();
}*/
  else{
    knex
      .insert(req.body)
      .into('Area')
      .then((data) => {
        res.status(200);
        res.send(data);
      })
      .catch((error) => {
        if (error.errno === 1062) {
          // https://mariadb.com/kb/en/library/mariadb-error-codes/
          res
            .status(409)
            .send('area with that name already exists!')
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
/** http://localhost:8787/api/area/edit    with method=PUT **/
// example: http://localhost:8787/api/area/edit/(id in the body)

area.put('/edit', function(req, res) {
  if (!req.body.id || !req.body.name) {
    res
      .status(400)
      .send('area id or name are missing!')
      .end();
  } else {
    knex('Area')
      .where('id', req.body.id)
      .update(req.body)
      .then((data) => {
        if (data === 0) {
          res
            .status(404)
            .send('Update not successful, ' + data + ' row modified')
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


export default area;
