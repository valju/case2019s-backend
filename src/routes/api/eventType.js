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

export default eventType;
