const gameService = require("../services/game.service");
const playerService = require("../services/player.service");
const BingoEngine = require("../domain/bingo.engine");

module.exports = (io, socket) => {

    socket.on("game:join", async ({ gameId, email }) => {
        try {
            const game = await gameService.joinGame(gameId, email);
            socket.join(gameId);

            io.to(gameId).emit("game:player-joined", {
                players: game.players,
            });
        } catch (error) {
            socket.emit("game:error", {
                message: error.message,
                status: error.status || 500,
            });
        }
    });

    socket.on("game:start", async ({ gameId }) => {
        try {
            const game = await gameService.startGame(gameId);
            io.to(gameId).emit("game:started", game);
        } catch (error) {
            socket.emit("game:error", {
                message: error.message,
                status: error.status || 500,
            });
        }
    });

    socket.on("game:call-number", async ({ gameId, number }) => {
        try {
            const game = await gameService.callNumber(gameId, number);

            io.to(gameId).emit("game:number-called", number);

            // 🔍 Verificar ganador
            for (const email of game.players) {
                const player = await playerService.getByEmail(email);
                if (!player || !player.bingoboard) continue;

                const engine = new BingoEngine(player.bingoboard);
                const isWinner = engine.isWinner(game.numbersCalled);

                if (isWinner) {
                    const finishedGame = await gameService.finishGame(
                        gameId,
                        email
                    );

                    io.to(gameId).emit("game:winner", {
                        winner: email,
                        game: finishedGame,
                    });

                    break; // solo un ganador
                }
            }
        } catch (error) {
            socket.emit("game:error", {
                message: error.message,
                status: error.status || 500,
            });
        }
    });
};
