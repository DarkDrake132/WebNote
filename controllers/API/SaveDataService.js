const noteModel = require('../../model/NoteModel');

exports.Save = async(req, res, next) => {
    console.log(req.query.noteID);
    console.log(req.query.title);
    console.log(req.query.content);
    res.json(await noteModel.saveNote(req.user._id, req.query.noteID, req.query.title, req.query.content));
}