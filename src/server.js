const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const config = require("./config/env");

(async () => {
    await connectDB();

    const server = http.createServer(app);
    const initSockets = require("./sockets");
    initSockets(server);


    server.listen(config.port, () => {
        console.log(
            `🚀 Server running on port ${config.port} [${config.env}]`
        );
    });
})();
