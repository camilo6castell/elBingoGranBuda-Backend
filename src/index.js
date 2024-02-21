const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { mongoose } = require("./db");
const cors = require("cors");

const app = express();
const port = 5000;

//settings

app.set("port", process.env.PORT || port);

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// archivos estáticos

app.use(express.static(path.join(__dirname, "public")));

//routes

app.use("/api/users", require("./routes/users"));
app.use("/api/game", require("./routes/game"));

//inicialización de servidor

app.listen(port, () => {
  console.log(`Conectado a http://localhost:${port}`);
});
