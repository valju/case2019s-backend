import express from "express";
import knex from "../../db/index";


// GET ALL
// http://localhost:8989/api/user/all METHOD = GET
const user = express.Router();

user.get("/all", function(req, res) {
    knex
      .select()
      .from("Event")
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
  /** http://localhost:8989/api/user/search/abc   with method=GET **/

  user.get("/search/:keyword", function(req, res) {

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


  export default user;
