const {db} = require('../database/db');
const {ObjectId} = require('mongodb');


exports.getListNote = async(idUser) => {
    const ListNoteCollection = db().collection('note');
    let user = await ListNoteCollection.findOne({userID: idUser});
    if (!user)
    {
        await ListNoteCollection.insertOne(
            {userID: idUser, noteList: [{noteID: 1, title: "New note", content: "New note"}]}
        );
        user = await ListNoteCollection.findOne({userID: idUser});
    }
    return user.noteList;
}

exports.addNote = async(idUser) => {
    const ListNoteCollection = db().collection('note');
    let user = await ListNoteCollection.findOne({userID: idUser});
    let id = user.noteList[user.noteList.length - 1].noteID + 1;
    await ListNoteCollection.updateOne(
                    {userID: idUser}, 
                    {
                        $push: {
                            noteList: {noteID: id, title: "New note", content: "New note"}
                        }
                    }
                )
}

exports.deleteNote = async(idUser, idNote) => {
    console.log(idNote);
    const ListNoteCollection = db().collection('note');
    await ListNoteCollection.updateOne(
        {userID: idUser},
        {$pull: {noteList: {noteID: parseInt(idNote)}}}
        );
}