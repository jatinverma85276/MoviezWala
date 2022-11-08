const mongoose = require('mongoose');
// const slugify = require('slugify');

const videoSchema = new mongoose.Schema({
    name: String,
    video:String,
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
// movieSchema.pre(/^find/, function (next) {
//     this.find().sort({ _id: -1 });
//     next();
// });

const MoviezwalaVideo = mongoose.model("video", videoSchema);

module.exports = MoviezwalaVideo;