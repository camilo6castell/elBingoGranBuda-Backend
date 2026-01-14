const gameService = require("../services/game.service");

exports.createGame = async (req, res, next) => {
    try {
        const { hostEmail } = req.body;
        const game = await gameService.createGame(hostEmail);
        res.status(201).json(game);
    } catch (error) {
        next(error);
    }
};

exports.joinGame = async (req, res, next) => {
    try {
        const { gameId, email } = req.body;
        const game = await gameService.joinGame(gameId, email);
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
};

exports.startGame = async (req, res, next) => {
    try {
        const { gameId } = req.body;
        const game = await gameService.startGame(gameId);
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
};

exports.callNumber = async (req, res, next) => {
    try {
        const { gameId, number } = req.body;
        const game = await gameService.callNumber(gameId, number);
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
};

exports.getGameState = async (req, res, next) => {
    try {
        const { gameId } = req.params;
        const game = await gameService.getGameState(gameId);
        res.status(200).json(game);
    } catch (error) {
        next(error);
    }
};
