const noteModel = require('../../model/NoteModel');

exports.List = async(req, res) => {
    let listNote = await noteModel.getListNote(req.user._id);
    res.render('notes', {notes: listNote});
}

exports.Add = async(req, res) => {
    await noteModel.addNote(req.user._id);
    res.redirect('/notes');
}

exports.Modified = async(req, res, next) => {
    console.log(req.query.noteID[0]);
    var tmp = "noteTitle" + 3;
    var tmp1 = req.query.tmp;
    console.log(tmp1);
    res.redirect('/notes')
}