const express = require("express");
//import { courses, find } from "./MOCK_DATA.json";
const {getAll, insertCourse, initialize } = require( "./database.js");

const courses = require("./Mock Data/Mock_Courses_table.json");

const app = express();
const PORT = 8000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

(async () => {
    try {
      // Call the initialize function first, and wait for it to complete
      await initialize();
  
      // Then call the insertCourse function
      await insertCourse();
  
      // Start the server after the MongoDB operations are complete
    //   app.listen(PORT, () => {
    //     console.log(`Server is running on port ${PORT}`);
    //   });
    } catch (err) {
      console.error("Error initializing or calling functions:", err);
    }
  })();