const { getAll, create, getOne, remove, update, setActors, setGenres, setDirectors } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id/actor')
    .post(setActors)

routerMovie.route('/:id/genre')
    .post(setGenres)
    
routerMovie.route('/:id/director')
    .post(setDirectors)
    

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

module.exports = routerMovie;