import express from "express";
import knex from "../../db/index";

// GET ALL
// http://localhost:8989/api/user/all METHOD = GET
const user = express.Router();

user.get("/all", function (req, res) {
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

//GET ONE

user.get("/:id", (req, res) => {
  knex
    .select()
    .from("User")
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

// GET ALL user Name by seraching keywords
/** http://localhost:8989/api/user/search/abc   with method=GET **/
user.get("/search/:keyword", function (req, res) {

  let keyword = req.params.keyword;  // just for shorter variable name later

  if (keyword && keyword.length > 0) {
    knex
      .select('*').from("User")
      .where('name', 'like', `%${keyword}%`)
      .union(function () {
        this.select('*').from("User")
          .where('name', 'like', `%${keyword}%`)
      })
      .union(function () {
        this.select('*').from("User")
          .whereNot('name', 'like', `%${keyword}%`)
      })
      .then(data => {
        res.status(200)
          .send(data)
          .end();
      })
      .catch(error => {
        if (error.errno === 1146) {
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

// ADD NEW USER
/** http://localhost:8989/api/user/   with method=POST **/
user.post("/", (req, res) => {
  const { firstName, lastName, email, isAdmin } = req.body
  if (firstName && lastName && email && typeof isAdmin === 'boolean') {
    knex
      .insert(req.body)
      .into("User")
      .then(data => {
        res.status(200);
        res.send({
          id: data,
          firstName: firstName,
          lastName: lastName,
          email: email,
          isAdmin: isAdmin
        })
      })
      .catch(error => {
        /* error.errno
        https://mariadb.com/kb/en/library/mariadb-error-codes/
        */
        switch (error.errno) {
          case 1062:
            res.status(409) // 409 Conflict
            res.send("Conflick: User with that name already exists!");
          case 1054:
            res.status(409);
            res.send("error in spelling [either in 'firstName' and/or in 'lastName' and/or in 'email' and/or in 'isAdmin' field]")
          default: {
            res.status(400);
            res.send(`Database error, Error number: ${error.errno}`)
          }
        }
      })
  }
  else {
    res.status(400);
    res.end(JSON.stringify({
      error: "first name and/or last name and/or email and/or isAdmin is missing."
    })
    )
  }
})
export default user;
