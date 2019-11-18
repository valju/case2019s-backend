import express from "express";
import knex from "../../db/index";

const areaUser = express.Router();
//GET all Area User all end-point 
// GET http://localhost:8989/api/areaUser/all
areaUser.get("/all",(req, res) =>{
 


        knex
          .select("areaId", "userId", "firstName", "lastName", "name")
          .from("AreaUser")
          .join("User", "AreaUser.userId", '=', 'User.id')
          .join("Area", "AreaUser.areaId", '=', 'Area.id')
          .then(data => {
              res
                .status(200)
                .send(data)
                .end();
          })
          .catch(err => {
               res.status(500)
               .send ("Database error: " + error.errno)
               .end();
          });
      });

export default areaUser;
