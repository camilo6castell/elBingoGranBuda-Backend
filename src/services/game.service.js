const Game = require("../models/game");

exports.createGame = async (hostEmail, name = null) => {
    const game = new Game({
        host: hostEmail,
        name,
        players: [hostEmail], // 👈 host entra automáticamente
        status: "waiting",
        numbersCalled: [],
    });

    await game.save();
    return game;
};

exports.joinGame = async (gameId, playerEmail) => {
    const game = await Game.findById(gameId);

    if (!game) {
        const error = new Error("Juego no encontrado");
        error.status = 404;
        throw error;
    }

    if (game.status !== "waiting") {
        const error = new Error("El juego ya ha comenzado");
        error.status = 400;
        throw error;
    }

    if (!game.players.includes(playerEmail)) {
        game.players.push(playerEmail);
        await game.save();
    }

    return game;
};

exports.startGame = async (gameId) => {
    const game = await Game.findById(gameId);

    if (!game) {
        const error = new Error("Juego no encontrado");
        error.status = 404;
        throw error;
    }

    if (game.status !== "waiting") {
        const error = new Error("El juego no puede iniciarse");
        error.status = 400;
        throw error;
    }

    game.status = "started";
    await game.save();

    return game;
};

exports.callNumber = async (gameId, number) => {
    const game = await Game.findById(gameId);

    if (!game) {
        const error = new Error("Juego no encontrado");
        error.status = 404;
        throw error;
    }

    if (game.status !== "started") {
        const error = new Error("El juego no está en curso");
        error.status = 400;
        throw error;
    }

    if (!game.numbersCalled.includes(number)) {
        game.numbersCalled.push(number);
        await game.save();
    }

    return game;
};

exports.finishGame = async (gameId, winnerEmail) => {
    const game = await Game.findById(gameId);

    if (!game) {
        const error = new Error("Juego no encontrado");
        error.status = 404;
        throw error;
    }

    game.status = "finished";
    game.winner = winnerEmail;
    await game.save();

    return game;
};

exports.getGameState = async (gameId) => {
    const game = await Game.findById(gameId);

    if (!game) {
        const error = new Error("Juego no encontrado");
        error.status = 404;
        throw error;
    }

    return game;
};
