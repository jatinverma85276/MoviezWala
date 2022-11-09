const mongoose = require('mongoose');
const slugify = require('slugify');

const movieSchema = new mongoose.Schema({
    movieName:{
        type:String,
        required:true,
        trim:true,
    },
    title: {
        type: String,
        text: true,
      },
    slug: String,
    movieDuration:{
        type: String
    },
    releaseDate:{
        type: String,
    },
    storyLine:{
        type:String,
        trim:true,
    },
    director:{
        type:String,
        trim:true,
    },
    writer:{
        type:String,
        trim:true,
    },
    cast:{
        type:String,
        trim:true,
    },
    genre:[String],
    language:{
        type:String,
        trim:true,
    },
    size:{
        type: String,
    },
    download:{
        type:String,
    },
    coverImage:[String],
    keywords:[String],
    updatedMovie: Number,
    recommecedByMoviezwala: Number,
    newRelease: Number,
    moviePoster:String,
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
movieSchema.pre("save", function (next) {
    this.slug = slugify(this.movieName, { lower: true });
    next();
});

// movieSchema.pre(/^find/, function (next) {
//     this.find().sort({ _id: -1 });
//     next();
// });

const Moviezwala = mongoose.model("moviezwala", movieSchema);

module.exports = Moviezwala;