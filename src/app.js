const path = require('path');
const express = require('express');
const { log } = console;
require('./db/mongooseConnection');
const { router: videoRouter } = require('./routers/videoRouter');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');

app.set('view engine', 'hbs');
app.set('views', viewsPath);

app.use(express.json());
app.use(videoRouter);

app.use(express.static(publicDirectoryPath));

module.exports = app;