const noteModel = require('../../model/NoteModel');

exports.List = async(req, res) => {
    let listNote = await noteModel.getListNote(req.user._id);
    res.render('notes', {notes: listNote});
}

exports.Add = async(req, res) => {
    await noteModel.addNote(req.user._id);
    res.redirect('/notes');
}