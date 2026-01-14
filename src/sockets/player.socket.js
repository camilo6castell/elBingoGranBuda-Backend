const playerService = require("../services/player.service");

module.exports = (io, socket) => {

    socket.on("player:login", async ({ email, password }) => {
        try {
            const player = await playerService.login(email, password);

            socket.emit("player:login:success", {
                email: player.email,
            });
        } catch (error) {
            socket.emit("player:login:error", {
                message: error.message,
                status: error.status || 500,
            });
        }
    });

    socket.on("player:save-board", async ({ email, bingoboard }) => {
        try {
            const player = await playerService.saveBingoBoard(
                email,
                bingoboard
            );

            socket.emit("player:save-board:success", {
                email: player.email,
            });
        } catch (error) {
            socket.emit("player:save-board:error", {
                message: error.message,
                status: error.status || 500,
            });
        }
    });

    socket.on("player:delete-board", async ({ email }) => {
        try {
            await playerService.deleteBoard(email);
            socket.emit("player:delete-board:success");
        } catch (error) {
            socket.emit("player:delete-board:error", {
                message: error.message,
                status: error.status || 500,
            });
        }
    });
};
