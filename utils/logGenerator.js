// utils/logGenerator.js
const { createObjectCsvWriter } = require('csv-writer');
const { complaintHistory } = require('../controllers/complaintsController');

function generateDailyLog() {
    const csvWriter = createObjectCsvWriter({
        path: `resolved_complaints_${new Date().toISOString().split('T')[0]}.csv`,
        header: [
            { id: 'id', title: 'ID' },
            { id: 'description', title: 'Description' },
            { id: 'priority', title: 'Priority' },
            { id: 'resolvedAt', title: 'Resolved At' }
        ]
    });

    const complaints = complaintHistory.getItems().map((complaint) => ({
        id: complaint.element.id,
        description: complaint.element.description,
        priority: complaint.priority,
        resolvedAt: complaint.resolvedAt
    }));

    csvWriter.writeRecords(complaints)
        .then(() => console.log('Daily log file created successfully.'))
        .catch(err => console.error('Error writing CSV:', err));
}

module.exports = generateDailyLog;
