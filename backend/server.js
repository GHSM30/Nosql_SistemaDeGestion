const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://mongodb:27017/usuariosDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conexión exitosa a MongoDB"))
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

app.use("/api/usuarios", usuarioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
