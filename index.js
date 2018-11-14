const express = require('express');
const download = require('download');
const fs = require('fs');

const app = express();

/**
 * Formulario para enviar las variables (sin fetch)
 */
app.get('/', function(request, response){
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
    download(request.query.img).then(data => {
        fs.writeFileSync('images/'+request.query.name+'.jpg', data);
    });   
    response.send('saved: ' + request.query.name);
});

app.listen(5500);