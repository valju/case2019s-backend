import express from "express";
import knex from "../../db/index";

const area = express.Router();

area.get("/all", function (req, res) {
  knex
    .select()
    .from("Area")
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ err: err.message }));
});

export default area;
