# Usar una imagen base de Node.js
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos al contenedor
COPY . .

# Exponer el puerto en el que el servidor va a escuchar (si es necesario)
EXPOSE 3000

# Comando para iniciar el servidor
CMD [ "node", "server.js" ]
