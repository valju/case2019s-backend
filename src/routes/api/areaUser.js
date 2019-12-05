import express from "express";

import knex from "../../db/index";

const areaUser = express.Router();

//GET all Area User all end-point

// GET http://localhost:8989/api/areaUser/all

areaUser.get("/all", (req, res) => {
  knex

    .select("areaId", "userId", "firstName", "lastName", "name")

    .from("AreaUser")

    .join("User", "AreaUser.userId", "=", "User.id")

    .join("Area", "AreaUser.areaId", "=", "Area.id")

    .then(data => {
      res

        .status(200)

        .send(data)

        .end();
    })

    .catch(err => {
      res

        .status(500)

        .send("Database error: " + error.errno)

        .end();
    });
});

// GET area user by (areaId, userId)

// GET http://localhost:8989/api/areaUser/areaId/userId

areaUser.get("/:areaId/:userId", (req, res) => {
  let { areaId, userId } = req.params;

  const getCondition =
    !isNaN(Number(areaId)) &&
    Number(areaId) !== 0 &&
    !isNaN(Number(userId)) &&
    Number(userId) !== 0;

  if (getCondition) {
    return knex

      .select("areaId", "userId", "firstName", "lastName", "name")

      .from("AreaUser")

      .join("User", "AreaUser.userId", "=", "User.id")

      .join("Area", "AreaUser.areaId", "=", "Area.id")

      .where({ areaId: areaId, userId: userId })

      .then(data => {
        if (data.length > 0) {
          res.status(200).json(data[0]);
        } else if (data.length === 0) {
          res.status(404).json({
            error:
              "Cannot find area-user with id (" + areaId + ", " + userId + ")"
          });
        }
      })

      .catch(err => res.status(500).json({ error: err.message }));
  } else {
    const errorMessage = "Parameters must be number!";

    const error = new Error(errorMessage);

    res.status(422).end(error.message);
  }
});

// POST area user

// POST http://localhost:8989/api/areaUser/

// example request body { "areaId": "102", "userId": "1001" }

areaUser.post("/", (req, res, next) => {
  let { areaId, userId } = req.body;

  const updateCondition =
    !isNaN(Number(areaId)) &&
    Number(areaId) !== 0 &&
    !isNaN(Number(userId)) &&
    Number(userId) !== 0;

  if (updateCondition) {
    return knex

      .select("areaId", "userId")

      .from("AreaUser")

      .where({ areaId: areaId, userId: userId })

      .then(data => {
        if (data.length === 0) {
          return knex

            .insert({ areaId, userId })

            .returning("*")

            .into("AreaUser");
        } else {
          throw new Error("The area user is already existed");
        }
      })

      .then(data => {
        return res.status(200).json({ success: "Idea user inserted" });
      })

      .catch(err => {
        if (err.message === "The area user is already existed") {
          const error = new Error(err.message);

          error.status = 409;

          next(error);
        } else {
          next(err);
        }
      });
  } else {
    const errorMessage = "Parameters must be number!";

    const error = new Error(errorMessage);

    res.status(422).end(error.message);
  }
});

// DELETE  Area User

// DELETE http://localhost:8989/api/areaUser/104/1002

areaUser.delete("/:areaId/:userId", (req, res, next) => {
  let areaId = req.params.areaId;

  let userId = req.params.userId;

  const deleteCondition =
    !isNaN(Number(areaId)) &&
    Number(areaId) !== 0 &&
    !isNaN(Number(userId)) &&
    Number(userId) !== 0;

  if (deleteCondition) {
    knex("AreaUser")
      .where({ areaId: areaId, userId: userId })

      .del()

      .then(data => {
        if (data > 0) {
          res.status(200).json({ success: "AreaUser deleted" });
        } else if (data === 0) {
          const error = new Error(
            "Cannot find Area-User with id (" +
              areaId +
              ", " +
              userId +
              ") to delete!"
          );

          res.status(404).end(error.message);
        }
      })

      .catch(err => next(err));
  } else {
    const errorMessage = "Parameters must be number!";

    const error = new Error(errorMessage);

    res.status(422).end(error.message);
  }
});

export default areaUser;
