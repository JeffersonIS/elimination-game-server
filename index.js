//MongoDB user: jeffersonostler pass: C6jN90tW32MjKAaf

//mongodb+srv://jeffersonostler:C6jN90tW32MjKAaf@cluster1.hsjluox.mongodb.net/?retryWrites=true&w=majority
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");
const { Item, Player, Place, Game, ActivePlayer } = require("./models");

const app = express();
const port = 3001;

app.use(cors());

mongoose.connect('mongodb+srv://jeffersonostler:C6jN90tW32MjKAaf@cluster1.hsjluox.mongodb.net/EliminationGame?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//GET REQUESTS
app.get('/player', async (req, res) => {
    const players = await Player.find({});
    res.send(players);
});

app.get('/item', async (req, res) => {
    const items = await Item.find({});
    res.send(items);
});

app.get('/place', async (req, res) => {
    const places = await Place.find({});
    res.send(places);
});

app.get('/allgames', async (req, res) => {
    const games = await Game.find({});
    res.send(games);
});

//.find().sort({age:-1}).limit(1)
app.get('/getHighestGameId', async (req, res) => {
    const game = await Game.find().sort({gameNumber:-1}).limit(1)
    res.send(game);
});

app.get('/activeplayers', async (req, res) => {
    const activeplayers = await ActivePlayer.find({});
    res.send(activeplayers);
});

app.get('/activeplayer/:player/:gameNumber', async (req, res) => {
    console.log(req.params)
    ActivePlayer.findOne(
        {
            player: req.params.player,
            gameNumber: req.params.gameNumber
        },
        function(err, player) {
            if(err) {
            res.json(err);
            }
            else {
            res.json(player);
            }
        });
});

app.get('/currentgame/:gameNumber', async (req, res) => {
    Game.findOne({gameNumber: req.params.gameNumber},
        function(err, game) {
            if(err) {res.json(err)}
            else {res.json(game)}
        });
});

//PUT REQUESTS
app.put('/updateactiveplayer', async (req, res) => {
    const activeplayer = await ActivePlayer.updateOne(
        {_id: req.body._id},
        { $set: {
            eliminated: req.body.eliminated,
            itemToUse: req.body.itemToUse,
            placeToKill: req.body.placeToKill,
            target: req.body.target,
            targetedBy: req.body.targetedBy,
        }}
    );
    return res.send(activeplayer);
});

app.put('/updategametocomplete/:gameId/:winner', async (req, res) => {
    const game = await Game.updateOne(
        {_id: req.params.gameId},
        { $set: {
            complete: true,
            winner: req.params.winner,
        }}
    );
    return res.send(game);
});

//POST REQUESTS
app.post('/player', async (req, res) => {
    const newPlayer = new Player({...req.body})
    const insertedPlayer = await newPlayer.save();
    return res.status(201).json(insertedPlayer);
});

app.post('/item', async (req, res) => {
    const newItem = new Item({...req.body})
    const insertedItem = await newItem.save();
    return res.status(201).json(insertedItem); 
});

app.post('/place', async (req, res) => {
    const newPlace = new Place({...req.body})
    const insertedPlace = await newPlace.save();
    return res.status(201).json(insertedPlace);
});

app.post('/game', async (req, res) => {
    const newGame = new Game({...req.body})
    const insertedGame = await newGame.save();
    return res.status(201).json(insertedGame);
})

app.post('/activeplayer', async (req, res) => {
    const newActivePlayer = new ActivePlayer({...req.body})
    const insertedActivePlayer = await newActivePlayer.save();
    return res.status(201).json(insertedActivePlayer);
})


//POST DELETE REQUESTS
app.post('/deleteplayer', async (req, res) => {
    const deleteResult = await Player.deleteOne(req.body);
})

app.post('/deleteitem', async (req, res) => {
    const deleteResult = await Item.deleteOne(req.body);
})

app.post('/deleteplace', async (req, res) => {
    const deleteResult = await Place.deleteOne(req.body);
    return res.status(201).json(deleteResult);
})

app.post('/deletegame', async (req, res) => {
    const deleteResult = await Game.deleteOne(req.body);
    return res.status(201).json(deleteResult);
})

app.post('/deleteactiveplayer', async (req, res) => {
    const activeplayer = await ActivePlayer.deleteOne(req.body);
    return res.status(201).json(deleteResult);
})

app.post('/deleteactiveplayers/:gameNumber', async (req, res) => {
    let deleteResult = await ActivePlayer.deleteMany({gameNumber: req.params.gameNumber})
    return res.status(201).json(deleteResult);
})

app.post('/deletegame/:gameNumber', async (req, res) => {
    let deleteResult = await Game.deleteOne({gameNumber: req.params.gameNumber})
    return res.status(201).json(deleteResult);
})

app.listen(port, () => console.log(`Noice! Listening on port ${port}`))