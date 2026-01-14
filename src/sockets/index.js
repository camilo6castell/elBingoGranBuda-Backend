const { Server } = require("socket.io");
const playerSocket = require("./player.socket");
const gameSocket = require("./game.socket");

module.exports = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" },
    });

    io.on("connection", (socket) => {
        console.log("🟢 Cliente conectado:", socket.id);

        // Registrar eventos de cada dominio
        playerSocket(io, socket);
        gameSocket(io, socket);

        socket.on("disconnect", () => {
            console.log("🔴 Cliente desconectado:", socket.id);
        });
    });
};
