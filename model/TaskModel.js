
const {db} = require('../database/db');
exports.AddTask = (task) => {
    const taskCollection = db().collection('task');
    taskCollection.insert(task);
};