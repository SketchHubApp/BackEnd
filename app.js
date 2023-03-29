const express = require('express');
const loader = require('./loader/loader');

async function startServer(){
    const app = express();
    await loader(app);
    app.listen(app.get('port'), () => {
        console.log(app.get('port'), 'port waiting...');
    });   
}

startServer();
