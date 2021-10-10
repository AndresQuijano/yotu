const express = require('express');
const { log } = console;
require('./db/mongooseConnection');
const { router: videoRouter } = require('./routers/videoRouter');

const app = express();

app.use(express.json());
app.use(videoRouter);

module.exports = app;