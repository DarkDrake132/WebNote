const GroupModel = require('../../model/GroupModel');

exports.CreateGroup = async(req, res) => {
    var message=[];
    if (req.body.inputName == ""){
        message.push("Thiếu trường Project Name");
    }
     if (req.body.inputDescription == ""){
        message.push("Thiếu trường Project Description");
    }
     if (req.body.inputStatus == undefined){
        message.push("Thiếu trường Status");
    }
     if (req.body.inputClientCompany == ""){
        message.push("Thiếu trường Client Company");
    }
     if (req.body.inputProjectLeader == ""){
        message.push("Thiếu trường Project Leader");
    }
     if (req.body.inputEstimatedBudget == ""){
        message.push("Thiếu trường Estimated budget");
    }
     if (req.body.inputSpentBudget == ""){
        message.push("Thiếu trường Total amount spent");
    }
    if (req.body.inputEstimatedDuration == ""){
        message.push("Thiếu trường Estimated project duration");
    }
    if (message.length == 0) {
        let idUser = req.user._id;
        let groupName = req.body.inputName;
        let message = req.body.inputDescription;
        await GroupModel.CreateGroup(idUser, groupName, message);
        res.redirect('/group');
    }
    else {
        req.session.error = message;
        res.redirect("/group/add");
    }
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