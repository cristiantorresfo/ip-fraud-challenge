# Usar una imagen base de Node.js con el entorno de desarrollo
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto de los archivos al contenedor
COPY . .

# Comando para iniciar el cliente
CMD [ "npm", "start" ]
