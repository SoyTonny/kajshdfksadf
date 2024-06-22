require('../models')
const request = require('supertest')
const app = require('../app')
const Actor = require('../models/Actor')
const Director = require('../models/Director')
const Genre = require('../models/Genre')

const BASE_URL = '/api/v1/movies'

let movieId

let actor
let director
let genre

const movie = {
    name: 'The Avengers',
    image: 'lorem.pnj',
    synopsis: 'lorem',
    releaseYear: '2014'
};

afterAll(async () => {
    await actor.destroy()
    await director.destroy()
    await genre.destroy()

  })

test('POST--> "BASE_URL" should return status code 201 and res.body.name === movie.name ', async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id

    expect(res.statusCode).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test('GET --> "BASE_URL" should return status code 200 and res.body[0].name === movie.name ', async () => {
    const res = await request(app)
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body[0].name).toBe(movie.name)
    expect(res.body).toHaveLength(1)
});

test('GET --> "BASE_URL/:ID" should return status code 200 and res.body.name === movie.name ', async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
});

test('PUT --> "BASE_URL/:ID" should return status code 200 and res.body.name === movieUpdate.name', async () => {
    const movieUpdate = {
        name: 'Movie Title Update',
        image: 'lorem.pnj',
        synopsis: 'lorem',
        releaseYear: '2005'
    }

    const res = await request(app)
        .put(`${BASE_URL}/${movieId}`)
        .send(movieUpdate)

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movieUpdate.name)
});

test("POST --> 'BASE_URL/:id/actors' should return status code 200 and res.body.length = 1", async () => {
    actor = await Actor.create({
        firstName: "Kevin",
        lastName: "Bacon",
        nationality: "frances",
        image: "lorem.png",
        birthday: "1960"
    })

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([actor.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].MovieActors.actorId).toBeDefined()
    expect(res.body[0].MovieActors.actorId).toBe(actor.id)

    expect(res.body[0].MovieActors.movieId).toBeDefined()
    expect(res.body[0].MovieActors.movieId).toBe(movieId)
});

test("POST --> 'BASE_URL/:id/directors' should return status code 200 and res.body.length = 1", async () => {
    director = await Director.create({
        firstName: "Quentin",
        lastName: "Tarantino",
        nationality: "frances",
        image: "lorem.png",
        birthday: "2000-02-31"
    });

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([director.id])


    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].MovieDirectors.directorId).toBeDefined()
    expect(res.body[0].MovieDirectors.directorId).toBe(director.id)

    expect(res.body[0].MovieDirectors.movieId).toBeDefined()
    expect(res.body[0].MovieDirectors.movieId).toBe(movieId)
});
test("POST --> 'BASE_URL/:id/genres' should return status code 200 and res.body.length = 1", async () => {
    genre = await Genre.create({
        name: "Action"
    });

    const res = await request(app)
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([genre.id])

    expect(res.statusCode).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].MovieGenres.genreId).toBeDefined()
    expect(res.body[0].MovieGenres.genreId).toBe(genre.id)

    expect(res.body[0].MovieGenres.movieId).toBeDefined()
    expect(res.body[0].MovieGenres.movieId).toBe(movieId)
});



test('DELETE --> "BASE_URL/:ID" should return status code 204', async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${movieId}`)

    expect(res.statusCode).toBe(204)
});
