var express = require('express');
var router = express.Router();
var taskModel = require('../model/TaskModel')

const {db} = require('../database/db');

/* GET home page. */
router.get('/', async function(req, res, next) {
  if(!req.user){
    res.redirect('/login');
  }
  let events = await taskModel.GetTasks(req.user._id);
  res.render('index', { title: 'Express', events: events });
});

router.post('/', function(req, res, next) {
  if(!req.user){
    res.redirect('/login');
  }
  if (req.body.newevent) {
    const taskCollection = db().collection('task');
    taskModel.AddTask(req.user._id, req.body.newevent, req.body.neweventclass)
  }
  res.redirect('back');
});
module.exports = router;
