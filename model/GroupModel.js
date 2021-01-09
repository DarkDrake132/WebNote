const {db} = require('../database/db');
const { ObjectId} = require('mongodb');

exports.CreateGroup = async(id, name, message) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    let group = {
        leader_id: id, groupName: name, description: message, founding_date: today
    }
    const groupDatabase = db().collection('group');
    
    await groupDatabase.insert(group);
    let groupId = group._id;
    const participantDatabase = db().collection('participation');  
    
    await participantDatabase.insert({groupId: groupId, member_id: ObjectId(id)});
    return true;
}

exports.AddMember = async(name) => {
    const userDatabase = db().collection('user');
    let member = userDatabase.findOne({username: name})
    const participantDatabase = db().collection('participation');
    await participantDatabase.insert({member_id: member._id});
    return true;
}

exports.RemoveMember = async(name) => {
    const userDatabase = db().collection('user');
    let member = userDatabase.findOne({username: name})
    const participantDatabase = db().collection('participation');
    await participantDatabase.deleteOne({member_id: member._id});
    return true;
}
exports.DeleteGroup = async(idGroup) => {
    const participationDatabase = db().collection('participation');
    await participationDatabase.deleteMany({_id: ObjectId(idGroup)});
    const groupDatabase = db().collection('group');
    await groupDatabase.deleteOne({_id: ObjectId(idGroup)});
    return true;
}

exports.GetAllGroupFromUser = async(id) => {
    const groupDatabase = db().collection('group');
    let arrGroup = await db().collection('participation').find({member_id: id}).toArray();
    let arrGroupFull = [];
    var i;
    for(i = 0; i < arrGroup.length; i++)
    {
        let group = await groupDatabase.findOne({_id: arrGroup[i].groupId});
        let groupMember = await db().collection('participation').find({groupId: arrGroup[i].groupId}).toArray();
        let MemberArr = [];
        var j;
        for(j = 0; j < groupMember.length; j++)
        {
            let user = await db().collection('user').findOne({_id: groupMember[j].member_id});
            MemberArr.push(user);
        }
        arrGroupFull.push({
            group,
            member: MemberArr
        });
    }
    return arrGroupFull;
}