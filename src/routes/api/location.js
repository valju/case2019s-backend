import express from "express";
import knex from "../../db/index";

const location = express.Router();


// GET ALL
location.get("/all", function (req, res) {
  knex("Location")
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ err: err.message }));
});

// GET ONE
location.get("/:id", function (req, res) {
  knex("Location")
    .where("id", req.params.id)
    .then(data => {
      if (data.length == 0) {
        res
          .status(404)
          .send("Invalid row number: " + req.params.id)
          .end();
      } else {
        res
          .status(200)
          .send(data)
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

// DELETE ONE
location.delete("/:id", function (req, res){
  knex("Location")
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

export default location;
