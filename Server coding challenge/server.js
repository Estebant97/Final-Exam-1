const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Movies} = require( './models/movie-model');
const {Actors} = require( './models/actor-model');

const errorHandler = require('./middleware/errorHandler');
const app = express();


app.patch('/api/delete-movie-actor/:movie_ID', jsonParser, async (req, res, next) => {
    const {id} = req.body;
    if(!id){
        next({errorCode: 1});
        return;
    }
    const movieId = req.params;
    if(id !== movieId){
        next({errorCode: 2})
        return;
    }
    const {firstName, lastName} = req.body;
    if(!firstName || !lastName){
        next({errorCode: 3});
        return;
    }
    let movies = await Movies.getMovieById( movieId )
    .then( movie => {
        return movie;
    })
    .catch( err => {
        res.statusMessage("something is wrong with the db ");
        return res.status(500).end();
    })
    let actors = await Actors.getActorById( actors._id )
    .then( actor => {
        return actor;
    })
    .catch( err => {
        res.statusMessage("something is wrong with the db ");
        return res.status(500).end();
    })

    if( !movies || !actors ){
        next({errorCode: 4});
        return;
    }
    Movies.removeActorFromMovieList(movieId, actors._id)
    .then( deletedMovie => {
        return res.status(201).json( deletedMovie );
    })
    .catch( err => {
        res.statusMessage("something is wrong with the db ");
        return res.status(500).end();
    })
})

app.use(errorHandler);

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});