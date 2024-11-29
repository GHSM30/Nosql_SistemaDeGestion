# Imagen base de Node.js
FROM node:18-slim

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos necesarios
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos
COPY . .

# Exponer el puerto y ejecutar el servidor
EXPOSE 5001
CMD ["node", "server.js"]
