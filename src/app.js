const path = require('path');
const express = require('express');
const { log } = console;
require('./db/mongooseConnection');
const { router: videoRouter } = require('./routers/videoRouter');

const publicDirectoryPath = path.join(__dirname, '../public');

const app = express();

app.use(express.json());
app.use(videoRouter);

app.use(express.static(publicDirectoryPath));

module.exports = app;