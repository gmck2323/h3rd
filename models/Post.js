const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: String,
    body: String,
    category: String,
    _user: { type:Schema.Types.ObjectId, ref: 'User'},
    dateCreated: Date
});

mongoose.model('posts', postSchema);