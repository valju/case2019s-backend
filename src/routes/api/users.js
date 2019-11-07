import express from "express";
import knex from "../../db/index";


// GET ALL
// http://localhost:8989/api/users/all METHOD = GET
const users = express.Router();

users.get("/all", function(req, res) {
    knex
      .select()
      .from("User")
      .then(data => {
        res
          .status(200)
          .send(data)
          .end();
      })
      .catch(error => {
        res
          .status(500)
          .send("Database error: " + error.errno)
          .end();
      });
  });





  // GET ALL user Name by seraching keywords
  /** http://localhost:8989/api/users/search/abc   with method=GET **/

  users.get("/search/:keyword", function(req, res) {

    let keyword = req.params.keyword;  // just for shorter variable name later

    if(keyword && keyword.length>0) {
      knex
        .select('*').from("User")
        .where('name', 'like', `%${keyword}%`)
        .union(function() {
          this.select('*').from("User")
          .where('name', 'like', `%${keyword}%`)
          })
        .union(function() {
          this.select('*').from("User")
          .whereNot('name', 'like', `%${keyword}%`)
          })
        .then(data => {
          res.status(200)
            .send(data)
            .end();
        })
        .catch(error => {

          if(error.errno===1146) {
            res
              .status(551)
              .send("Database table not created. DB error: " + error.errno)
              .end();
          } else {
            res
              .status(500)
              .send("Database error: " + error.errno)
              .end();
          }

        });
    } else {
      res
            .status(400)
            .send("Missing keyword, keyword is: " + keyword)
            .end();
    }
  });


  export default users;
