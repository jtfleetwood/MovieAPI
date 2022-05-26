import express from 'express';
import * as queries from './queries.js';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

app.post('/new_movie', async (req, res, next) => {
    res.send(await queries.add_movie(req.body));
});

app.get('/movies', async (req, res, next) => {
    res.send(await queries.get_movies());
});

app.get('/movies/:id', async (req, res, next) => {
    res.send(await queries.get_movie_by_id(req.params.id));
});

app.delete('/movies/:id', async (req, res, next) => {
    res.send(await queries.delete_movie(req.params.id));
})

app.listen(PORT);
