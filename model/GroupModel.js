const {db} = require('../database/db');
const { ObjectId} = require('mongodb');

exports.CreateGroup = async(id, message) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    let group = {
        leader_id: id, description: message, founding_date: today
    }
    const groupDatabase = db().collection('group');
    await groupDatabase.insert({group});
    return group._id.$oid;
}

exports.DeleteGroup = async(idGroup) => {
    const participationDatabase = db().collection('participation');
    await participationDatabase.deleteMany({_id: ObjectId(idGroup)});
    const groupDatabase = db().collection('group');
    await groupDatabase.deleteOne({_id: ObjectId(idGroup)});
    return true;
}