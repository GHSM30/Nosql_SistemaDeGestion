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

# Exponer el puerto y ejecutar la aplicación
EXPOSE 3000
CMD ["npm", "start"]
