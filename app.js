// app.js
const express = require('express');
const generateDailyLog = require('./utils/logGenerator');
const {
    addComplaint,
    resolveComplaint,
    getComplaints,
    getHistory
} = require('./controllers/complaintsController');

const app = express();
const PORT = 3000;

app.use(express.json());

// Routes
app.post('/complaint', addComplaint);
app.post('/resolve-complaint', resolveComplaint);
app.get('/complaints', getComplaints);
app.get('/history', getHistory);

// Set up a daily interval to generate the log file at midnight (24 hours interval)
setInterval(generateDailyLog, 24 * 60 * 60 * 1000);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

