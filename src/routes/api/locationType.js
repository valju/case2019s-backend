import express from "express";
import knex from "../../db/index";

const locationType = express.Router();

// GET ALL
locationType.get("/all", function (req, res) {
  knex("LocationType")
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ err: err.message }));
});

// GET ONE
locationType.get("/:id", function (req, res) {
  if (isNaN(req.params.id)) {
    res.status(441)
      .send(`Id should be number and this is not: ${req.params.id}`)
      .end();
  } else if (req.params.id < 1) {
    res.status(442)
      .send(`Id should be >= 1 and this is not: ${req.params.id}`)
      .end()
  } else {
    knex("LocationType")
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
  }
});

// DELETE ONE
locationType.delete("/:id", function (req, res) {
  if (isNaN(req.params.id)) {
    res.status(441)
      .send(`Id should be number and this is not: ${req.params.id}`)
      .end();
  } else if (req.params.id < 1) {
    res.status(442)
      .send(`Id should be >= 1 and this is not: ${req.params.id}`)
      .end()
  } else {
    knex("LocationType")
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
  }
});

export default locationType;
