const GroupModel = require('../../model/GroupModel');

exports.CreateGroup = async(req, res) => {
    let idUser = req.user._id;
    let groupName = req.body.inputName;
    let message = req.body.inputDescription;
    await GroupModel.CreateGroup(idUser, groupName, message);
    res.redirect('/group');
}

exports.AddMember = (req, res) => {
    let name = req.query.namne;
    let idGroup = req.query.groupId;
    GroupModel.AddMember(name);
    res.redirect('/group/dedtail?groupId=' + idGroup);
}

exports.RemoveMember = (req, res) => {
    let name = req.query.namne;
    let idGroup = req.query.groupId;
    GroupModel.RemoveMember(name);
    res.redirect('/group/dedtail?groupId=' + idGroup);
}


exports.ViewGroup = async(req, res) => {
    let objectRet = await GroupModel.GetAllGroupFromUser(req.user._id);
    objectRet.forEach(item => console.log(item));
    res.render('group/groupView', {group: objectRet});
}

exports.DeleteGroup = async(req, res) => {
    let idGroup = req.query.groupId;
    await GroupModel.DeleteGroup(idGroup);
    res.redirect('/group');
}