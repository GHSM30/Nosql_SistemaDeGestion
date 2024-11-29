import React, { useEffect, useState } from "react";
import "./styles.css";

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    username: "",
    dni: "",
    password: "",
    enabled: true,
    role: { granted_authorities: [] },
  });

  // Cargar usuarios desde el backend
  const cargarUsuarios = () => {
    fetch("http://localhost:5001/api/usuarios")
      .then((res) => res.json())
      .then(setUsuarios)
      .catch(console.error);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "enabled") {
      setForm({ ...form, [name]: e.target.checked });
    } else if (name === "granted_authorities") {
      setForm({ ...form, role: { granted_authorities: value.split(",") } });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Crear usuario
  const crearUsuario = (e) => {
    e.preventDefault();
    fetch("http://localhost:5001/api/usuarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => {
        if (res.ok) {
          cargarUsuarios();
          setForm({
            username: "",
            dni: "",
            password: "",
            enabled: true,
            role: { granted_authorities: [] },
          });
        }
      })
      .catch(console.error);
  };

  // Eliminar usuario
  const eliminarUsuario = (id) => {
    fetch(`http://localhost:5001/api/usuarios/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) cargarUsuarios();
      })
      .catch(console.error);
  };

  return (
    <div className="container">
      <h1>Gestión de Usuarios</h1>

      {/* Formulario para agregar usuarios */}
      <form onSubmit={crearUsuario} className="formulario">
        <h2>Crear Usuario</h2>
        <label>
          Nombre de Usuario:
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          DNI:
          <input
            type="text"
            name="dni"
            value={form.dni}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Activo:
          <input
            type="checkbox"
            name="enabled"
            checked={form.enabled}
            onChange={handleChange}
          />
        </label>
        <label>
          Roles (separados por coma):
          <input
            type="text"
            name="granted_authorities"
            value={form.role.granted_authorities.join(",")}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Crear Usuario</button>
      </form>

      {/* Tabla para mostrar los usuarios */}
      <table>
        <thead>
          <tr>
            <th>Nombre de Usuario</th>
            <th>DNI</th>
            <th>Activo</th>
            <th>Roles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u._id}>
              <td>{u.username}</td>
              <td>{u.dni}</td>
              <td>{u.enabled ? "Sí" : "No"}</td>
              <td>{u.role.granted_authorities.join(", ")}</td>
              <td>
                <button onClick={() => eliminarUsuario(u._id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
