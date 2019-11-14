import express from "express";
import knex from "../../db/index";

const location = express.Router();

location.get("/all", function (req, res) {
  knex
    .select()
    .from("Location")
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ err: err.message }));
});

export default location;
