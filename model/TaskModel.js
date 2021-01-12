
const {db} = require('../database/db');
const {ObjectId} = require('mongodb');

exports.AddTask = async (id, task, type) => {
    const taskCollection = db().collection('task');
    taskCollection.findOne({userid: id}).then(user => {
        const newevent = {
            event: task,
            type: type,
        }
        if (user){
            var newevents = user.events;
            newevents.push(newevent);
            taskCollection.updateOne({ userid: id }
                , { $set: { events : newevents } });
        }
        else {
            const newuser = {
                userid: id,
                events:[newevent,],
            }
            taskCollection.insert(newuser);
        }
    });

};

exports.GetTasks = async (id) => {
    const taskCollection = db().collection('task');
    let user = await taskCollection.findOne({userid: id});
        return user.events;
        if (user){
            return user.events;
        }
        else{
            return null;
        }
};