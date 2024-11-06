// controllers/complaintsController.js
const PriorityQueue = require('../priorityQueue');
const Stack = require('../stack');

const complaintQueue = new PriorityQueue();
const complaintHistory = new Stack();

const addComplaint = (req, res) => {
    const { id, description, priority } = req.body;
    complaintQueue.enqueue({ id, description }, priority);
    res.status(200).send("Complaint added to the queue.");
};

const resolveComplaint = (req, res) => {
    if (complaintQueue.isEmpty()) {
        return res.status(400).send("No complaints to resolve.");
    }
    const resolvedComplaint = complaintQueue.dequeue();
    complaintHistory.push({ ...resolvedComplaint, resolvedAt: new Date().toISOString() });
    res.status(200).send(`Complaint ${resolvedComplaint.element.id} resolved and added to history.`);
};

const getComplaints = (req, res) => {
    const complaints = complaintQueue.getItems();
    res.status(200).json(complaints);
};

const getHistory = (req, res) => {
    const history = complaintHistory.getItems();
    res.status(200).json(history);
};

module.exports = {
    addComplaint,
    resolveComplaint,
    getComplaints,
    getHistory,
    complaintHistory
};
