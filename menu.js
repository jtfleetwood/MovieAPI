import fetch from 'node-fetch';
import {movie} from './models/movie.js'
import promptSync from 'prompt-sync';

const input = promptSync();


const testPost = async () => {
    
    var title = input('Please enter in title: ');
    var release_year = parseInt(input('Please enter in a release year: '));

    
    const response = await fetch('http://localhost:4000/new_movie', {
        method:'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(new movie(title, release_year)
        )
    
    });

    const response_body = await response.json();

    console.log(response_body.message);
}

const testGetAll = async () => {
    const response = await fetch('http://localhost:4000/movies', {
        method:'GET',
        headers:{'content-type':'application/json'}
    });

    const movies = await response.json();
    console.log(movies);
}

const testGetById = async () => {
    let id = parseInt(input('Enter in ID of movie to get: '));
    const response = await fetch(`http://localhost:4000/movies/${id}`, {
        method:'GET',
        headers:{'content-type':'application/json'}
    });

    const movie = await response.json();

    console.log(movie);
}

const testDeleteById = async () => {
    let id = parseInt(input('Enter in ID of movie to delete: '));
    const response = await fetch(`http://localhost:4000/movies/${id}`, {
        method:'DELETE',
        headers:{'content-type':'application/json'}
    });

    const response_body = await response.json();

    console.log(response_body);
}


console.log('Welcome to the Movie Database API!\n');
while (true) {
    console.log('\nMenu:\n1. Add new movie\n2. Get all movies\n3. Get movie by ID\n4. Delete movie by ID\n5. Exit API GUI');
    let choice = parseInt(input('Enter in API Menu Choice: '));

    switch(choice) {
        case 1:
            await testPost();
            break;
        
        case 2:
            await testGetAll();
            break;
        
        case 3:
            await testGetById();
            break;
        
        case 4:
            await testDeleteById();
            break;
        
        case 5:
            process.exit(0);

        default:
            console.log('Please enter in a valid option (1-4)!');
            break;
    }
}

