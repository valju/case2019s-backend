import express from "express";
import knex from "../../db/index";

const urgencyType = express.Router();

// GET
/** http://localhost:8989/api/urgencyType/all  with method=GET **/

urgencyType.get("/all", function (req, res) {
  knex
    .select("id", "name", "description")
    .from("UrgencyType")
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json({ error: err.message }));

});

urgencyType.get("/:id",function(req,res){
  knex
  .select("id","name","description")
  .from("UrgencyType")
  .where('id',req.params.id)
  .then(data=>res.status(200).json(data))
  .catch(err=>res.status(500).json({error:err.message}));
});




export  default urgencyType;
