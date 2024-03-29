const express = require("express");
//import { courses, find } from "./MOCK_DATA.json";
const {getAll, insertCourse, initialize, deleteCourse } = require( "./database.js");

const courses = require("./Mock Data/Mock_Courses_table.json");
const { get } = require("mongoose");

const app = express();
const port = process.env.PORT || 1337;

// Routes
app.get("/api/courses", (req, res) => {
  return res.json(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const id = req.params.id;
  const course = courses.find((course) => course.id === parseInt(id));
  if (!course) {
    return res.status(404).send("The course with the given ID was not found.");
  }
  return res.json(course);
});

// app.route("/api/courses").post((req, res) => {});




// USE THE CLIENT APP
app.use(express.static("../frontend/build"));

// RENDER FRONTEND FOR ANY PATH
app.get("*", (req, res) => res.sendFile(__dirname + "/../frontend/build/index.html"));



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

(() => {
    try {
      // Call the initialize function first, and wait for it to complete
      initialize();
  
      // Then call the insertCourse function
      insertCourse();

      deleteCourse();

      getAll();
    } catch (err) {
      console.error("Error initializing or calling functions:", err);
    }
  })();