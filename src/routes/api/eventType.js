import express from "express";
import knex from "../../db/index";

const eventType = express.Router();

// GET
/** http://localhost:8989/api/eventType/all  with method=GET **/

eventType.get("/all", function (req, res) {
  knex
    .select()
    .from("EventType")
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: err.message }));
});

// GET ONE
// GET http://localhost:8989/api/eventType/:id METHOD = get
//Example: http://localhost:8989/api/eventType/11
eventType.get("/:id", (req, res) => {
  knex
    .select()
    .from("EventType")
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

export default eventType;
