//Load Data
var friendsData = require("../data/friends");

module.exports = function (app) {
    app.get("/api/survey", function (req, res) {
        res.json(friendsData);
    });

    app.post("/api/survey", function (req, res) {
        var newFriend = req.body;
        var newScore = newFriend.scores.reduce(
            (accum, value) => parseInt(accum) + parseInt(value));

        var bestMatch = {
            index: 0,
            score: friendsData[0].scores.reduce((accum, value) => parseInt(accum) + parseInt(value))
        }

        for (let i = 1; i < friendsData; i++) {
            var value = friendsData[i].scores.reduce(
                (accum, value) => parseInt(accum) + parseInt(value)
            );
            var currentDiff = Math.abs(newScore - value);
            var bestDiff = Math.abs(newScore - bestMatch.score);
            
            if (currentDiff < bestDiff) {
                bestMatch = {
                    index: i,
                    score: value
                }
            }
        }


        friendsData.push(newFriend);
        res.json(friendsData[bestMatch.index]);
    })
};