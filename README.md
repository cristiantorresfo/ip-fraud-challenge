# Ejecutar la aplicación en contenedores Docker utilizando docker-compose

Este repositorio contiene una aplicación que se puede ejecutar en contenedores Docker utilizando `docker-compose`. A continuación se detallan los pasos necesarios para construir y ejecutar los contenedores.

## Prerrequisitos

- Docker: Asegúrate de tener Docker instalado en tu sistema. Puedes obtenerlo en [https://www.docker.com/](https://www.docker.com/).

## Pasos

1. Clona este repositorio en tu máquina local:
 
  git clone ip-fraud-challenge
  
2. Ve al directorio del repositorio:

 cd ip-fraud-challenge
 
3. Ejecuta el siguiente comando para construir las imágenes de los contenedores:

 docker-compose build
 
4. Una vez que se hayan construido las imágenes, puedes iniciar los contenedores en segundo plano con el siguiente comando:

 docker-compose up -d

Este comando ejecutará los contenedores en segundo plano (-d) según la configuración definida en el archivo docker-compose.yml. Los contenedores comenzarán a ejecutar la aplicación.

5. Para acceder a la aplicación (cliente) ingresa a http://localhost:8080 (puerto especificado en el archivo docker-compose.yml)

6. Para detener y eliminar los contenedores, ejecuta el siguiente comando:





