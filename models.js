const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const PlaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
});

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    secretCode: {
        type: String,
        required: true,
    },
    totalPlayersEliminated: {
        type: Number,
        required: true,
    },
    gamesWon: {
        type: Number,
        required: true,
    },
});

const GameSchema = new mongoose.Schema({
    gameNumber: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    numPlayers: {
        type: Number,
        required: true,
    },
    winner: {
        type: String,
        required: false,
    },
    complete: {
        type: Boolean,
        required: true,
    }
});

const ActivePlayerSchema = new mongoose.Schema({
    gameNumber: {
        type: String, 
        required: true,
    },
    player: {
        type: String,
        required: true,
    },
    playerId: {
        type: String,
        required: true,
    },
    targetedBy: {
        type: String,
        required: true,
    },
    target: {
        type: String,
        required: true,
    },
    itemToUse: {
        type: String,
        required: true,
    },
    placeToKill: {
        type: String,
        required: true,
    },
    eliminated: {
        type: Boolean,
        required: true,
    },
    secretCode: {
        type: String,
        required: true,
    },
});

const Player = mongoose.model("Player", PlayerSchema);
const Item = mongoose.model("Item", ItemSchema);
const Place = mongoose.model("Place", PlaceSchema);

const Game = mongoose.model("Game", GameSchema);
const ActivePlayer = mongoose.model("ActivePlayer", ActivePlayerSchema);

module.exports = {
    Player: Player,
    Item: Item,
    Place: Place,
    Game: Game,
    ActivePlayer: ActivePlayer,
}

