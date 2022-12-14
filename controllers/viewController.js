const Moviezwala = require("../models/movieModel");
const MoviezwalaVideo = require("../models/videoModel");
const ObjectId = require('mongodb').ObjectId;

exports.getOverview = async (req, res) => {
    const updatedMovies = await Moviezwala.find({"updatedMovie": 1});
    const recommByMoviezwala = await Moviezwala.find({"recommecedByMoviezwala": 1});
    const newRelease = await Moviezwala.find({"newRelease": 1});
    const videos = await MoviezwalaVideo.find()
  
    res.status(200).render("main",{
      updatedMovies: updatedMovies,
      recommByMoviezwala: recommByMoviezwala,
      newRelease : newRelease,
      videos : videos
    });
  };

exports.getMovie = async (req, res) => {
  
  const movie_detail = await Moviezwala.findOne({slug: req.params.slug});
  // console.log(movie_detail.coverImage)
  res.status(200).render("review",{
    movie_detail
  })
}

exports.getAllMovie = async (req, res) => {
  const movies = await Moviezwala.find({genre: req.params.genre});
  res.status(200).render("otherPage",{
    movies: movies
  })
}

exports.browseMovie = async (req, res)=>{
  let browseMovie
  if(req.params.browse === "newRelease"){
    browseMovie = await Moviezwala.find({newRelease: 1});
  }else if(req.params.browse === "recommecedByMoviezwala"){
    browseMovie = await Moviezwala.find({recommecedByMoviezwala: 1});
  }else if(req.params.browse === "updatedMovie"){
    browseMovie = await Moviezwala.find({updatedMovie: 1});
  }
  res.status(200).render("otherPage",{
    movies: browseMovie
  })
}

exports.search = async (req, res) =>{
  const {search} = req.query;
  if(search.length === 0){
    res.redirect('/');
  }else{
    const searchMovie = await Moviezwala.find({"keywords": search});
    if(searchMovie.length === 0){
      res.redirect("/notFound")
    }else{
      res.status(200).render("otherPage",{
        movies: searchMovie
      })
    } 
  }
}


exports.errPage = (req, res) =>{
  res.status(200).render("errPage")
}