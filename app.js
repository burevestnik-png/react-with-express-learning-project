const express = require("express");
const config = require("config");
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(5000, () => {
            console.log(`App has been started on port: ${PORT}...`)
        })
    } catch (e) {
        console.log("Server suddenly stopped");
        console.error(e.message);
        process.exit(1);
    }
}

start();
