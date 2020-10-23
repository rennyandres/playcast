// app.js

/*----------------------------- GLOBAL VARIABLES ----------------------------*/
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const routes     = require('./routes');
let   PORT       = process.env.PORT || 8080;

/*---------------------------------- CONFIG ---------------------------------*/
app.use(bodyParser.urlencoded({ extended: false }));

// CORS 
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/', routes);


/*---------------------------------- FOOTER ---------------------------------*/
app.listen(PORT, process.env.IP, () => {
    console.log('Listening request on PORT ' 
        + PORT 
        + ' and IP ' 
        + process.env.IP
    );
});


