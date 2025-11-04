# Este es el archivo: programacio/Dockerfile

# Usar una imagen oficial de Node.js
FROM node:18-alpine

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copia el resto del código (esto es útil para el "build" inicial)
COPY . .

# Exponer el puerto (debe coincidir con tu .env, ej: 3000)
EXPOSE 3000

# Comando para iniciar la aplicación con nodemon
CMD [ "npm", "run", "test" ]