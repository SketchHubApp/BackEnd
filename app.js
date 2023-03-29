const express = require('express');
const loader = require('./loader/loader');
const bodyParser = require('body-parser');

async function startServer(){
    const app = express();
    app.use(bodyParser.json());
    app.use(express.urlencoded( {extended : false } ));
    await loader(app);
    app.listen(app.get('port'), () => {
        console.log(app.get('port'), 'port waiting...');
    });   
}

startServer();
