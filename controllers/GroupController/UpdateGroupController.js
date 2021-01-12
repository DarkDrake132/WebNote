const GroupModel = require('../../model/GroupModel');

exports.CreateGroup = async(req, res) => {
    let idUser = req.user._id;
    let groupName = req.body.inputName;
    let message = req.body.inputDescription;
    await GroupModel.CreateGroup(idUser, groupName, message);
    res.redirect('/group');
}

exports.GetGroup = async(req, res) => {
    if(!req.user)
    {
        res.redirect('/login');
    }
    console.log(req.user);
    let idGroup = req.query.groupId;
    let GroupRet = await GroupModel.GetGroup(idGroup, req.user._id);
    if(!GroupRet)
    {
        res.redirect('/group');
    }
    res.render('group/groupDetail', GroupRet);
}

exports.AddMember = (req, res) => {
    let name = req.body.nameMember;
    let idGroup = req.body.idGroup;
    GroupModel.AddMember(idGroup, name);
    res.redirect('/group/detail?groupId=' + idGroup);
}

exports.RemoveMember = (req, res) => {
    let id = req.query.id;
    let idGroup = req.query.groupId;
    GroupModel.RemoveMember(idGroup, id);
    res.redirect('/group/detail?groupId=' + idGroup);
}


exports.ViewGroup = async(req, res) => {
    if(!req.user)
    {
        res.redirect('/login');
    }
    let objectRet = await GroupModel.GetAllGroupFromUser(req.user._id);
    res.render('group/groupView', {group: objectRet});
}

exports.DeleteGroup = async(req, res) => {
    let idGroup = req.query.groupId;
    await GroupModel.DeleteGroup(idGroup);
    res.redirect('/group');
}