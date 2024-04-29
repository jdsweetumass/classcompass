const mongoose = require("mongoose");
const { spawn } = require("child_process");
const courseData = require("./course.json");
const Course = require("./models/course");

/**
 * This function connects to the MongoDB database using the provided URL.
 * @param {*} url The MongoDB URL
 * @returns The connection to the MongoDB database
 */
async function connectMongoDB(url) {
    return mongoose.connect(url);
}

/**
 * Runs the Python web scrapper script
 * @returns None
 */
function runScrapper() {
    // Attempt to use 'python' first
    let pythonProcess = spawn("python", ["./webScrapper.py"]);

    pythonProcess.on("error", (err) => {
        if (err.code === "ENOENT") {
            console.log("'python' not found, trying 'python3' instead...");

            // If 'python' is not found - try 'python3'
            pythonProcess = spawn("python3", ["./webScrapper.py"]);

            setupProcessHandlers(pythonProcess);

            pythonProcess.on("error", (err) => {
                if (err.code === "ENOENT") {
                    console.error(
                        "Neither 'python' nor 'python3' could be found - \nPlease install Python first."
                    );
                    exit();
                }
            });
        }
    });

    setupProcessHandlers(pythonProcess);
}

/**
 * Sets up the event handlers for the Python process
 * @param {ChildProcess} pythonProcess - The Python process
 * @returns None
 */
function setupProcessHandlers(pythonProcess) {
    pythonProcess.stdout.on("data", (data) => {
        console.log("Done Scrapping");
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error(`Python script error: ${data}`);
    });
}

async function processCourses() {
    const courses = courseData.courses;
    for (const course of courses) {
        const { code, name, credits, instructors, description, prerequisites } =
            course;
        const newCourse = await Course.create({
            code,
            name,
            credits,
            instructors,
            description,
            prerequisites,
        });
    }
    console.log(courses.length);
    console.log(
        "Done processing courses, Total courses in database: ",
        Course.countDocuments()
    );
}

module.exports = { connectMongoDB, runScrapper, processCourses };
