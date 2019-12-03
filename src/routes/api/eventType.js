import express from "express";
import knex from "../../db/index";

const eventType = express.Router();

// GET ALL
/** http://localhost:8989/api/eventType/all   with METHOD = GET **/

eventType.get("/all", function (req, res) {
  knex
    .select()
    .from("EventType")
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
});

// GET ONE
// GET http://localhost:8989/api/eventType/:id   with METHOD = GET **/

eventType.get("/:id", (req, res) => {

  console.log("id: " + req.params.id);

  if (isNaN(req.params.id)) {
    res.status(441)
      .send("Id should be number and this is not: " + req.params.id)
      .end();
  } else if (req.params.id < 1) {
    res.status(442)
      .send("Id should be >= 1 and this is not: " + req.params.id)
      .end();
  } else {
    knex
      .select()
      .from("EventType")
      .where("id", req.params.id)
      .then(data => {
        if (data.length !== 1) {
          res
            .status(404)
            .send("Non-existing category id: " + req.params.id)
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
  }


});

//Delete ONE
/** http://localhost:8989/api/eventType/:id   with method=DELETE **/
// example: http://localhost:8989/api/eventType/11
//delete works only in the case if there are no foreign key constraints issues
// at the moment all the eventTypes are

eventType.delete("/:id", function (req, res) {
  knex("EventType")
    .where("id", req.params.id)
    .del()
    .then(data => {
      if (data == 0) {
        res
          .status(404)
          .send("Invalid row number: " + req.params.id)
          .end();
      } else {
        res
          .status(200)
          .send("Delete successful! Count of deleted rows: " + data)
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

// CREATE ONE
/** http://localhost:8989/api/eventType/    with method=POST **/

eventType.post("/", function (req, res) {
  if (!req.body.name) {
    res
      .status(400)
      .send("name is missing!")
      .end();
  } else {
    knex
      .insert(req.body)
      .into("EventType")
      .then(data => {
        res.status(200);
        res.send(data);
      })
      .catch(error => {
        if (error.errno == 1062) {
          // https://mariadb.com/kb/en/library/mariadb-error-codes/
          res
            .status(409)
            .send("eventType with that name already exists!")
            .end();
        } else {
          res
            .status(500)
            .send("Database error: " + error.errno)
            .end();
        }
      });
  }
});



// EDIT ONE
/** http://localhost:8989/api/eventType/    with method=PUT **/


eventType.put("/", function (req, res) {
  if (!req.body.name) {
    res
      .status(400)
      .send("name is missing!")
      .end();
  } else {
    knex("EventType")
      .where("name", req.body.name)
      .update(req.body)
      .then(data => {
        if (data == 0) {
          res
            .status(404)
            .send("Invalid row number: " + req.body.id)
            .end();
        } else {
          res
            .status(200)
            .send("Update successful! Count of modified rows: " + data)
            .end();
        }
      })
      .catch(error => {
        if (error.errno == 1062) {
          res
            .status(409)
            .send("EventType with that name already exists!")
            .end();
        } else {
          res
            .status(500)
            .send("Database error: " + error.errno)
            .end();
        }
      });
  }
});

export default eventType;
