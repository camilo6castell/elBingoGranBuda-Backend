const Player = require("../models/player");
const bcrypt = require("bcryptjs");

exports.login = async (email, password) => {
    // 👇 IMPORTANTE: traer password explícitamente
    const player = await Player.findOne({ email }).select("+password");

    if (!player) {
        const error = new Error("El usuario no existe, por favor regístrese");
        error.status = 404;
        throw error;
    }

    const isValid = await bcrypt.compare(password, player.password);
    if (!isValid) {
        const error = new Error("Verifica tu información y vuelve a intentarlo");
        error.status = 401;
        throw error;
    }

    // Nunca devuelvas el password
    player.password = undefined;
    return player;
};

exports.register = async (email, password) => {
    const existing = await Player.findOne({ email });

    if (existing) {
        const error = new Error("El usuario ya existe, por favor inicie sesión");
        error.status = 409;
        throw error;
    }

    const newPlayer = new Player({ email, password });
    await newPlayer.save();

    newPlayer.password = undefined;
    return newPlayer;
};

exports.getByEmail = async (email) => {
    return Player.findOne({ email });
};


exports.saveBingoBoard = async (email, bingoboard) => {
    const player = await Player.findOne({ email });

    if (!player) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }

    // Solo permitir setear una vez
    if (player.bingoboard.B.length === 0) {
        player.bingoboard = bingoboard;
        await player.save();
    }

    return player;
};

exports.isOnGame = async (email) => {
    const player = await Player.findOne({ email });
    if (!player) return false;

    return player.bingoboard.B.length !== 0;
};

exports.deleteBoard = async (email) => {
    const player = await Player.findOne({ email });

    if (!player) {
        const error = new Error("Usuario no encontrado");
        error.status = 404;
        throw error;
    }

    player.bingoboard = { B: [], I: [], N: [], G: [], O: [] };
    await player.save();

    return true;
};
