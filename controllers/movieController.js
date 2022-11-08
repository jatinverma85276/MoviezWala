const Moviezwala = require("../models/movieModel");
const axios = require('axios');
const MoviezwalaVideo = require("../models/videoModel");

exports.addMovie = async (req, res)=>{
    async function detail(){
        const imdb = await axios.get(`https://imdb-api.com/en/API/Title/k_qbfco06p/${req.body.imdbID}/Posters`)
        const tmdb = await axios.get(`https://api.themoviedb.org/3/movie/${req.body.tmdbID}?api_key=${process.env.TMDB_API_KEY}&language=en-US`);
        return [imdb.data,tmdb.data]
    }
    const [movie_imdb_detail,movie_tmdb_detail] = await detail();

    // console.log("Movie Details: " + movie_imdb_detail)
    const movie_Name = `Download ${movie_imdb_detail["fullTitle"]}`;
    const keywordList = movie_imdb_detail["keywordList"]
    const movieSplitKeyword = movie_imdb_detail["title"].toLowerCase().split(" ");
    const moviePoster = `https://image.tmdb.org/t/p/w500${movie_tmdb_detail["backdrop_path"]}`
    const movie = await Moviezwala.create({
        movieName: movie_Name,
        moviePoster: moviePoster,
        title: movie_imdb_detail["title"],
        movieDuration: movie_imdb_detail["runtimeStr"],
        genre: [...movie_imdb_detail["genres"].toLowerCase().split(", ")],
        releaseDate: movie_imdb_detail["releaseDate"],
        storyLine: movie_tmdb_detail["overview"],
        director: movie_imdb_detail["directors"],
        writer: movie_imdb_detail["writers"],
        language: "English",
        cast: movie_imdb_detail["stars"],
        keywords: [...keywordList, ...movieSplitKeyword, movie_imdb_detail["title"].toLowerCase()],
        download: "kjkjnx",
        size: "892",
        coverImage: movie_imdb_detail["posters"].backdrops.slice(0, 3).map(poster=>poster.link),
        updatedMovie: req.body.updatedMovie,
        recommecedByMoviezwala:req.body.recommendedByMoviezwala,
        newRelease: req.body.newRelease
      });

    res.status(200).json({
        status: "success",
        data: movie
    })
}

exports.allMovie = async (req,res,next)=>{
    const allMovie = await Moviezwala.find()
    res.status(200).json({
        status: "success",
        result: allMovie.length,
        data: allMovie
    })
}

exports.addVideo = async (req,res) =>{
    console.log("jhvbjhfd")
    console.log("vieo",req.body.video)
    const video = await MoviezwalaVideo.updateOne({
        name : "updateVideo"
    },{$set:{video:req.body.video}})
    res.status(200).json({
        status: 'success',
        data : video
    })
}