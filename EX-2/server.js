// server.js
import express from 'express';
import courses from "./course.js";
import logger from './logger.js';
import validateQuery from './validateQuery.js';
const app = express();
const PORT = 3000;

// Global middleware
app.use(logger);


// Route: GET /departments/:dept/courses
app.get('/departments/:dept/courses', validateQuery, (req, res) => {
    const { dept } = req.params;
    const { level , minCredits, maxCredits, semester, instructor } = req.query;
    // Implementing the filter logic
    // Hint: Use the filter method to filter the courses array based on the provided criteria

    const min = parseInt(minCredits);
    const max = parseInt(maxCredits);

    if(!isNaN(min) && !isNaN(max) && min > max) {
        return res.status(400).json({error: "minCredits connot be greater than maxCredits"});
    };

    let result = courses.filter(course => {
        if (course.department !== dept) return false;
        if ( course.level && level !== level) return false;
        if ( course.credits && !isNaN(min) < min) return false;
        if ( course.credits && !isNaN(max) > max) return false;
        if ( course.semester && semester !== semester) return false;
        if (    course.instructor && instructor.toLowerCase().includes(instructor.toLowerCase())) return false;
        return true;
    });

    res.json({
        result,
        meta: {
            total: result.length
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
