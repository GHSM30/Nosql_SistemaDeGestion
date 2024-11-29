db = db.getSiblingDB("users"); // Selecciona la base de datos 'users'

db.usuarios.insertOne({
  username: "nuevoUsuario",
  dni: "NUEVO123456",
  enabled: true,
  password: "$2a$10$hashedpassword",
  role: {
    granted_authorities: ["read", "write"]
  }
});
