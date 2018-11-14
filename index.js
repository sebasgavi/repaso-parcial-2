// importar módulo express (se debe instalar con npm)
const express = require('express');

// importar módulo download (se debe instalar con npm)
const download = require('download');

// importar módulo filesystem (ya viene instalado con node)
const fs = require('fs');

// crear el servidor
const app = express();

/**
 * Formulario para enviar las variables (sin fetch)
 */
app.get('/', function(request, response){
    // Se utiliza el comando send para enviar el HTML
    response.send(`
        <form method="GET" action="/api/download">
            <input name="img" placeholder="image url">
            <input name="name" placeholder="file name">
            <button type="submit">Download</button>
        </form>
    `);
});

/**
 * Formulario para enviar las variables (con fetch)
 */
app.get('/fetch', function(request, response){
    // Se utiliza el comando send para enviar el HTML y JS
    response.send(`
        <form>
            <input name="img" placeholder="image url">
            <input name="name" placeholder="file name">
            <button type="submit">Download</button>
        </form>

        <script>
            document.querySelector('form').addEventListener('submit', function(event){
                event.preventDefault();
                fetch('/api/download?img='+this.img.value+'&name='+this.name.value)
                    .then(b => b.text())
                    .then(alert)
                    .catch(console.error);
            });
        </script>
    `);
});

/**
 * Ruta para descargar la imagen
 * Recibe dos variables con query (GET)
 * img: ruta de la imagen
 * name: nombre del archivo
 */
app.get('/api/download', function(request, response){
    // Con el módulo download descarga la imagen con la ruta en la variable img
    download(request.query.img).then(data => {
        // Con el módulo fs se guarda la imagen en la carpeta images con el nombre de la variable name
        // Es importante que la carpeta images exista previamente
        fs.writeFileSync('images/'+request.query.name+'.jpg', data);
        // Se envía un mensaje al usuario después de la descarga
        response.send('saved: ' + request.query.name);
    });   
});

// iniciar el servidor
app.listen(5500);