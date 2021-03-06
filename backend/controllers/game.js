const Games = require('../models/game.model');


exports.getGames = function (req, res, next) {

    let fileter = req.body.filter;
    Games.find((err, games) => {
        if (err){
            return next(err);
        }
        if (fileter !== undefined){
            var query = null;
            if (fileter && parseInt(fileter)){
                query = {"$or" : [{_id:{$regex:fileter}}, {contentfulState:{$eq:parseInt(fileter)}},
                        {title:{$regex: fileter}}, {imageUrl:{$regex:fileter}}, {priority:{$eq: parseInt(fileter)}}, {count:{$eq:parseInt(fileter)}}]}
            }else {
                query = {"or":[{_id:{$regex:fileter}}, {title:{$regex:fileter}}, {imageUrl:{$regex:fileter}}]}
            }
            Games.find(query, (err, filteredGames) => {
                if (err){
                    return next(err);
                }
                res.status(200).json({games:filteredGames})
            })
        }else {
            res.status(200).json({games:games})
        }
    })
}


exports.delete = function (req, res, next) {
    const fId = req.params.id;
    Games.findByIdAndRemove(fId, (err, deleteGames) => {
        if (err){
            console.log(err);
        }
        Games.find().exec(function (err, games) {
            if (err){
                console.log(err)
            }
            return res.status(200).json({games:games});
        })
    })
}


exports.update = function (req, res, next) {
    Games.findById(req.body._id, function (err, tData) {
        if (err){
            res.send(err);
        }
        tData.title = req.body.title;
        tData.imageUrl = req.body.imageUrl;
        tData.priority = req.body.priority;
        tData.contentfulState = req.body.contentfulState;
        tData.count = req.body.count;
        const gameData = new Games(tData);

        gameData.save((err, savedGame) => {
            if (err){
                res.send(err);
            }
            Games.find().exec(function (err, games) {
                if (err){
                    res.send(err)
                }
                return res.status(200).json({games:games});
            });
        });
    });
}


exports.create = function (req, res, next) {

    let tData = new Games();
    tData._id = req.body._id;
    tData.title = req.body.title;
    tData.imageUrl = req.body.imageUrl;
    tData.priority = parseInt(req.body.priority);
    tData.contentfulState = req.body.contentfulState;
    tData.count = req.body.count;

    Games.find((err, games) => {
        if (err){
            res.send(err);
        }
        tData.save((err, savedGames) => {
            if (err){
                res.send(err);
            }
            Games.find().exec(function (err,games ) {
                if (err){
                    res.send(err);
                }
                return res.status(200).json({games:games});
            })
        })
    })
}