const playerService = require("../services/player.service");

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const player = await playerService.login(email, password);
        res.status(200).json({ session: player });
    } catch (error) {
        next(error);
    }
};

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        await playerService.register(email, password);
        res.status(201).json({
            code: 201,
            message: "El usuario ha sido creado, ahora puede iniciar sesión",
        });
    } catch (error) {
        next(error);
    }
};

exports.saveBingoBoard = async (req, res, next) => {
    try {
        const { email, bingoboard } = req.body;
        const player = await playerService.saveBingoBoard(email, bingoboard);
        res.status(200).json({ player });
    } catch (error) {
        next(error);
    }
};

exports.isOnGame = async (req, res, next) => {
    try {
        const { email } = req.body;
        const isongame = await playerService.isOnGame(email);
        res.status(200).json({ isongame });
    } catch (error) {
        next(error);
    }
};

exports.deleteBoard = async (req, res, next) => {
    try {
        const { email } = req.body;
        await playerService.deleteBoard(email);
        res.status(200).json({ code: 200 });
    } catch (error) {
        next(error);
    }
};
