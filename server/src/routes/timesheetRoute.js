const express = require("express");
const FruitModel = require("../models/TimesheetModel");
const VisitIdModel = require("../models/VisitIDModel");

// Create a new router to handle fruits routes
const router = express.Router();

// Add a health check for fruits routes
router.get("/_health", (request, response) => {
  console.log("session:", request.session);
  response.send(" Timesheet health routes work OK");
});

// Get all fruits
router.get("/all", (request, response) => {
  FruitModel.find()
    .populate("visitId")
    .then((timesheet) => {
      response.send(timesheet);
    })
    .catch(() => {
      response.status(500).send("unable to query timesheet");
    });
});

// Create a new fruit
router.post("/new-timesheet", (request, response) => {
  // Extract your request body
  const requestBody = request.body;
  // Call your database and add that fruit object to your collection
  FruitModel.create(requestBody).then((data) => {
    console.log(data);
    response.send("This timesheet was added successfully!");
  });
});

// Update an existing fruit

// new -> if this is true, return back TO THE API the modified object; or else return older object
// upsert -> if true, add a new entry if id doesn't exist, if false -> throw an error

router.patch("/update-timesheet/:id", (request, response) => {
  FruitModel.findByIdAndUpdate(request.params.id, request.body, {
    new: true,
    upsert: true,
  })
    .then((data) => {
      console.log("Update successful!");
      response.send(data);
    })
    .catch(() => {
      console.log("Something went wrong!!");
      response.status(404).send("timesheet was not found!!");
    });
});

// delete route
router.delete("/delete-timesheet/:id", (request, response) => {
  FruitModel.findByIdAndDelete(request.params.id)
    .then((data) => {
      console.log("Deleted successfully!");
      response.send(data);
    })
    .catch(() => {
      console.log("Something went wrong!!");
      response.status(404).send("timesheet was not found!!");
    });
});

// Category routes

// Create a category by doing a post request in postman
router.post("/visitId", (request, response) => {
  const requestBody = request.body;

  VisitIdModel.create(requestBody)
    .then((data) => {
      response.send(data);
    })
    .catch(() => {
      response.status(500).send("unable to create visit type");
    });
});

// Get all categories so we can use that information in the dropdown in the ui
router.get("/visitId/all", (request, response) => {
  VisitIdModel.find()
    .then((visit) => {
      response.send(visit);
    })
    .catch((error) => {
      console.log("error:", error);
      response.status(500).send("cannot load visit type");
    });
});

module.exports = router;