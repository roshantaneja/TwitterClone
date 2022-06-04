const mongoose = require("mongoose");
var config = require("./config.json");

class Database {

    constructor() {
        this.connect()
    }

    connect() {
        mongoose.connect("mongodb+srv://" + config.mongodb.login + ":" + config.mongodb.password + "@twitterclonecluster.ykiaoqt.mongodb.net/TwitterCloneDB?retryWrites=true&w=majority")
            .then(() => {
                console.log("database connection successful!");
            })
            .catch((err) => {
                console.log("database connection error" + err);
            })
    }
}

module.export = new Database();