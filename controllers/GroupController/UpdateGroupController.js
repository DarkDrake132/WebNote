const GroupModel = require('../../model/GroupModel');

exports.CreateGroup = (req, res) => {
    let idUser = req.user._id;
    let message = req.body.description;
    let idGroup = GroupModel.CreateGroup(idUser, message);
    res.redirect('/group/dedtail?groupId=' + idGroup);
}

exports.EditGroup = (req, res) => {

}

exports.ViewGroup = (req, res) => {

}

exports.DeleteGroup = (req, res) => {
    let idGroup = req.query.groupId;
    GroupModel.DeleteGroup(idGroup);
    res.redirect('/group');
}