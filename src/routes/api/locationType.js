import express from "express";
import knex from "../../db/index";

const locationType = express.Router();

locationType.get("/all", function (req, res) {
  knex
    .select()
    .from("LocationType")
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ err: err.message }));
});

export default locationType;
