const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    }, 
    getMovieById : function (movie_ID){
        return moviesCollection
            .findOne( { movie_ID: movie_ID} )
            .then( movie => {
                return movie;
            })
            .catch( err => {
                throw new Error( err );
            })
    },
    removeActorFromMovieList : function( movieId, actorId ){
        return moviesCollection
        // checar esto faltaria hacer un populate para sacar la info de la movie
        .findByIdAndUpdate({movie_ID : movieId}, {$pull : {actorId: actors._id}} , null)
        .populate( 'actors', 'firstName lastName')
        .then( deletedActor => {
            return deletedActor;
        })  
        .catch( err => {
            throw new Error( err );
        })
    }
    // here goes the PATCH to delete -- might need to use $pull : {id , null }
}

module.exports = {
    Movies
};

