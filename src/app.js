const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { log } = console;
require('./db/mongooseConnection');
const { router: videoRouter } = require('./routers/videoRouter');
const { router: generalRouter } = require('./routers/generalRouter');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.use(express.json());
app.use(videoRouter);
app.use(generalRouter);


module.exports = app;