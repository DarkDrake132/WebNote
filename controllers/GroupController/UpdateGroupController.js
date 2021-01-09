const GroupModel = require('../../model/GroupModel');

exports.CreateGroup = (req, res) => {
    let idUser = req.user._id;
    let groupName = req.body.inputName;
    let message = req.body.inputDescription;
    GroupModel.CreateGroup(idUser, groupName, message);
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


exports.ViewGroup = (req, res) => {

}

exports.DeleteGroup = (req, res) => {
    let idGroup = req.query.groupId;
    GroupModel.DeleteGroup(idGroup);
    res.redirect('/group');
}