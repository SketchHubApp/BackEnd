const nunjucks = require('nunjucks');


module.exports = async(expressApp)=>{
    expressApp.set('view engine', 'html');
    // nunjucks.configure(path.join(__dirname, 'views'), {
    //     express: expressApp,
    //     watch: true,
    // });
}