function errorHandler(err, req, res, next) {
    const {errorCode} = err;

    if( errorCode == 1){
        res.statusMessage("Id is missing in the body of the request");
        res.status(406).end();
    }
    if( errorCode == 2){
        res.statusMessage("id and movie_ID do not match");
        res.status(409).end();
    }
    if( errorCode == 3){
        res.statusMessage("You need to send both firstName and lastName of the actor to remove from the movie list");
        res.status(403).end();
    }
    if( errorCode == 4){
        res.statusMessage("The actor or movie do not exist");
        res.status(404).end();
    }
}

module.exports = errorHandler;