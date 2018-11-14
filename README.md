# Repaso parcial 2

## Paso 1:
Utilizando Node con el framework Express, debe crear un servidor con una sola ruta /api/descargar.

Esta ruta debe recibir dos variables, una URL de una imagen y un nombre de archivo.

Cuando el usuario ingrese a la ruta el servidor debe guardar dicha imagen en una carpeta "imagenes" con su nombre respectivo.

Se recomienda utilizar el módulo download (debe instalarlo con npm) https://www.npmjs.com/package/download


Sí el usuario ingresa la ruta sin alguna de las variables el servidor debe retornar un mensaje de error.

## Paso 2:
Debe crear una interfaz que permita al usuario ingresar las variables y enviar la información al servidor.

Deben ser dos rutas distintas (/ para el formulario y /api/descargar para el punto anterior)

