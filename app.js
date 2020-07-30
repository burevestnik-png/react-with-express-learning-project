const express = require("express");
const config = require("config");
const mongoose = require('mongoose');

const app = express();
const PORT = config.get('port') || 5000;

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/links.routes'));

async function start() {
    try {
        await mongoose.connect(config.get('mongoURI'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, () => {
            console.log(`App has been started on port: ${PORT}...`)
        })
    } catch (e) {
        console.log("Server suddenly stopped");
        console.error(e.message);
        process.exit(1);
    }
}

start();
