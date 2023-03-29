const databaseLoader = require("./databaseLoader");
const expressLoader = require("./expressLoader");
const viewLoader = require("./viewLoader");

module.exports = async(app)=>{
    await expressLoader(app);
    console.log("express Loading...");

    await viewLoader(app);
    console.log("view Loading....");

    await databaseLoader(app);
    console.log("dataBase Loading...");
}