const noteModel = require('../../model/NoteModel');

exports.Save = async(req, res, next) => {
    res.json(await noteModel.saveNote(req.user._id, req.query.noteID, req.query.title, req.query.content));
}