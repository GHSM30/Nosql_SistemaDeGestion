import React, { useState, useEffect } from "react";

// Componente principal de la tabla de usuarios
const UsuariosTable = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    username: "",
    dni: "",
    enabled: true,
    role: { granted_authorities: [] },
  });
  const [usuarioEditado, setUsuarioEditado] = useState(null);

  // Cargar los usuarios al montar el componente
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/usuarios");
        const data = await response.json();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    fetchUsuarios();
  }, []);

  // Función para agregar un nuevo usuario
  const agregarUsuario = async () => {
    if (!nuevoUsuario.username || !nuevoUsuario.dni) {
      console.error("El nombre de usuario y el DNI son obligatorios.");
      return;
    }
    try {
      const response = await fetch("http://localhost:5001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      if (!response.ok) {
        throw new Error(`Error al agregar usuario: ${response.statusText}`);
      }
      const data = await response.json();
      // Agregar el nuevo usuario a la lista
      setUsuarios([...usuarios, data]);
      // Resetear el estado del nuevo usuario
      setNuevoUsuario({
        username: "",
        dni: "",
        enabled: true,
        role: { granted_authorities: [] },
      });
    } catch (error) {
      console.error("Error al agregar usuario:", error);
    }
  };

  // Función para editar un usuario
  const editarUsuario = async (id, usuarioActualizado) => {
    try {
      const response = await fetch(`http://localhost:5001/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioActualizado),
      });
      if (!response.ok) {
        throw new Error(`Error al editar usuario: ${response.statusText}`);
      }
      const data = await response.json();
      // Actualizar la lista de usuarios con los cambios
      setUsuarios(usuarios.map((user) => (user._id === id ? data : user)));
      setUsuarioEditado(null); // Limpiar el estado de edición
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };

  // Función para eliminar un usuario
  const eliminarUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/usuarios/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error al eliminar usuario: ${response.statusText}`);
      }
      // Actualizar la lista después de la eliminación
      setUsuarios(usuarios.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };

  // Manejo de agregar un usuario
  const handleAgregar = () => {
    agregarUsuario();
  };

  // Manejo de la edición de un usuario
  const handleEditar = (usuario) => {
    setUsuarioEditado({ ...usuario }); // Copiar usuario para editar
  };

  // Manejo de guardar la edición
  const handleGuardarEdicion = () => {
    if (!usuarioEditado.username || !usuarioEditado.dni) {
      console.error("El nombre de usuario y el DNI son obligatorios.");
      return;
    }
    editarUsuario(usuarioEditado._id, usuarioEditado);
  };

  // Manejo de eliminar un usuario
  const handleEliminar = (id) => {
    eliminarUsuario(id);
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>

      {/* Tabla de usuarios */}
      <table border="1">
        <thead>
          <tr>
            <th>Username</th>
            <th>DNI</th>
            <th>Enabled</th>
            <th>Role</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario._id}>
              <td>
                {usuarioEditado && usuarioEditado._id === usuario._id ? (
                  <input
                    type="text"
                    value={usuarioEditado.username}
                    onChange={(e) =>
                      setUsuarioEditado({ ...usuarioEditado, username: e.target.value })
                    }
                  />
                ) : (
                  usuario.username
                )}
              </td>
              <td>
                {usuarioEditado && usuarioEditado._id === usuario._id ? (
                  <input
                    type="text"
                    value={usuarioEditado.dni}
                    onChange={(e) =>
                      setUsuarioEditado({ ...usuarioEditado, dni: e.target.value })
                    }
                  />
                ) : (
                  usuario.dni
                )}
              </td>
              <td>
                {usuarioEditado && usuarioEditado._id === usuario._id ? (
                  <input
                    type="checkbox"
                    checked={usuarioEditado.enabled}
                    onChange={(e) =>
                      setUsuarioEditado({ ...usuarioEditado, enabled: e.target.checked })
                    }
                  />
                ) : (
                  usuario.enabled ? "Sí" : "No"
                )}
              </td>
              <td>
                {usuario.role.granted_authorities.join(", ")}
              </td>
              <td>
                {usuarioEditado && usuarioEditado._id === usuario._id ? (
                  <>
                    <button onClick={handleGuardarEdicion}>Guardar</button>
                    <button onClick={() => setUsuarioEditado(null)}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEditar(usuario)}>Editar</button>
                    <button onClick={() => handleEliminar(usuario._id)}>Eliminar</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para agregar nuevo usuario */}
      <div>
        <h2>Agregar Usuario</h2>
        <input
          type="text"
          placeholder="Username"
          value={nuevoUsuario.username}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="DNI"
          value={nuevoUsuario.dni}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, dni: e.target.value })}
        />
        <input
          type="checkbox"
          checked={nuevoUsuario.enabled}
          onChange={(e) => setNuevoUsuario({ ...nuevoUsuario, enabled: e.target.checked })}
        />
        <button onClick={handleAgregar}>Agregar</button>
      </div>
    </div>
  );
};

export default UsuariosTable;
