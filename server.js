const express = require("express");
const bodyParser = require("body-parser");

const app = express();
var dbConn  = require('./db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/1/musica",
    (req, res) => {
        dbConn.query('SELECT * FROM Canciones_Mas_Escuchados', function(err,rows) {
            if(err) {
               res.send(err)
            } else {
                res.send(rows)
            }
        })
    });
app.get("/1/usuarios",
    (req, res) => {
        dbConn.query('SELECT * FROM ReporteIngresoUsuarios', function(err,rows) {
            if(err) {
                res.send(err)
            } else {
                res.send(rows)
            }
        })
    });
app.get("/1/reproduccion",
    (req, res) => {
        dbConn.query('SELECT * FROM Reproducion_Cancion_Usuario', function(err,rows) {
            if(err) {
                res.send(err)
            } else {
                res.send(rows)
            }
        })
    });

app.use((req, res) => {
    res.status(404).send({
        success: false,
        data: {
            message: "Estás intentando hacer algo que no deberías"
        },
    })
});

app.listen(81, () => {
    console.log("Servidor ejecutándose...");
});
