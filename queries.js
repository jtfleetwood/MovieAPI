import Pool from 'pg';
import * as config from './config.js'

const pool = new Pool.Pool(config.db_data);

export const add_movie = async (movie_to_add) => {
    try {
        await pool.query(`INSERT INTO movies (title, release_year)
        VALUES('${movie_to_add.title}', ${movie_to_add.release_year})`);

        return {message: 'Movie added succesfully..'};
    }

    catch(error) {
        return {message: error.message};
    }
};

export const get_movies = async () => {
    try {
        let movies = await pool.query('SELECT * FROM movies');
        return movies.rows;
    }

    catch (error) {
        return {message : error.message};
    }
}

export const get_movie_by_id = async (id) => {
    try {
        let movie = await pool.query(`SELECT * FROM movies WHERE id = ${id}`);
        return movie.rows[0];
    }

    catch (error) {
        return {message : error.message};
    }
}

export const delete_movie = async (id) => {
    try {
        await pool.query(`DELETE FROM movies WHERE id = ${id}`);

        return {message : 'Movie succesfully deleted'};
    }

    catch (error) {
        return {message : error.message};
    }
}




