const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  username: { type: String, required: true },
  dni: { type: String, required: true },
  password: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  role: {
    granted_authorities: { type: [String], default: [] },
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
