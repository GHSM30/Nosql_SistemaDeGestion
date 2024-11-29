const express = require("express");
const Usuario = require("../models/Usuario");
const router = express.Router();

// Obtener todos los usuarios
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    res.status(201).json(usuario);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Actualizar un usuario
router.put("/:id", async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(usuario);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Eliminar un usuario
router.delete("/:id", async (req, res) => {
  try {
    await Usuario.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
