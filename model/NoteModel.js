const {db} = require('../database/db');
const {ObjectId} = require('mongodb');


exports.getListNote = async(idUser) => {
    const ListNoteCollection = db().collection('note');
    let user = await ListNoteCollection.findOne({userID: idUser});
    let length = await ListNoteCollection.aggregate([
        {$unwind: "$noteList"},
        {$project: {"_id": 0, "name" : 1, "sizeOfArray": {$size: "$noteList"}}}
    ]);
    console.log(length);
    return user.noteList;
}

exports.addNote = async(idUser) => {
    const ListNoteCollection = db().collection('note');
    await ListNoteCollection.updateOne(
                    {userID: idUser}, 
                    {
                        $push: {
                            noteList: {title: "New note", content: "New note"}
                        }
                    }
                )
}