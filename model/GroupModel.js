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
    return 1;
}

exports.AddMember =async(idGroup, name) => {
    const userDatabase = db().collection('user');
    let member = await userDatabase.findOne({username: name});
    if(!member)
    {
        return 0;
    }
    const participantDatabase = db().collection('participation');
    let member2 = await participantDatabase.findOne({groupId: ObjectId(idGroup), member_id: member._id});
    if(member2 != null)
    {
        return 0;
    }
    await participantDatabase.insert({groupId: ObjectId(idGroup), member_id: member._id});
    return 1;
}

exports.RemoveMember = async(idGroup, id) => {
    const participantDatabase = db().collection('participation');
    await participantDatabase.deleteOne({groupId: ObjectId(idGroup), member_id: ObjectId(id)});
    return 1;
}

exports.GetGroup = async(idGroup, id) => {
    let groupDatabase = await db().collection('group').findOne({_id: ObjectId(idGroup)});
    let checker = await db().collection('participation').findOne({member_id: id});
    if(!checker)
    {
        return false;
    }
    let groupMember = await db().collection('participation').find({groupId: groupDatabase._id}).toArray();
    let MemberArr = [];
    var j;
    for(j = 0; j < groupMember.length; j++)
    {
        let user = await db().collection('user').findOne({_id: groupMember[j].member_id});
        MemberArr.push(user);
    }
    let retOb = {
        group: groupDatabase,
        member: MemberArr
    }
    return retOb;
}

exports.DeleteGroup = async(idGroup) => {
    const participationDatabase = db().collection('participation');
    await participationDatabase.deleteMany({groupId: ObjectId(idGroup)});
    const groupDatabase = db().collection('group');
    await groupDatabase.deleteOne({_id: ObjectId(idGroup)});
    return 1;
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