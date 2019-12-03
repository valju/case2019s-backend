import express from "express";
import knex from "../../db/index";

const area = express.Router();

// GET ALL with specified keyword in name or description
/** http://localhost:8989/api/category/all    with method=GET **/

area.get("/all", function (req, res) {
  knex
    .select()
    .from("Area")
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ err: err.message }));
});

// GET ONE BY ID
/** http://localhost:8989/api/area/    with method=GET **/
// example: http://localhost:8989/api/area/101

area.get('/:id', (req,res) => {
  if(isNaN(req.params.id)){
    res.status(441)
    .send(`Id should be number and this is not: ${req.params.id}`)
    .end();
  }else if(req.params.id < 1){
    res.status(442)
    .send(`Id should be >= 1 and this is not: ${req.params.id}`)
    .end()
  }else {
    knex('Area')
      .where('id', req.params.id)
      .then(data => {
        if(data.length !== 1){
          res
            .status(404)
            .send(`Non-existing area id: ${req.params.id}`)
            .end();
        }else{
          res
            .status(200)
            .send(data)
            .end();
        }
      })
      .catch(error => {
        res
          .status(500)
          .send(`Database error: ${error.message}`)
          .end();
      })
  }
});

// DELETE ONE BY ID
/** http://localhost:8989/api/area/    with method=DELETE **/
// example: http://localhost:8989/api/area/101

area.delete('/:id', (req,res) => {
  if(isNaN(req.params.id)){
    res.status(441)
    .send(`Id should be number and this is not: ${req.params.id}`)
    .end();
  }else if(req.params.id < 1){
    res.status(442)
    .send(`Id should be >= 1 and this is not: ${req.params.id}`)
    .end()
  }else {
    knex('Area')
      .where('id', req.params.id)
      .del()
      .then(data => {
        if(data.length !== 1){
          res
            .status(404)
            .send(`Non-existing area id: ${req.params.id}`)
            .end();
        }else{
          res
            .status(200)
            .send(`Delete successful! Count of deleted rows: ${data}`)
            .end();
        }
      })
      .catch(error => {
        res
          .status(500)
          .send(`Database error: ${error.message}`)
          .end();
      })
  }
});

export default area;
