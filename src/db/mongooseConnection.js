const mongoose = require('mongoose');

console.log('Is passing by here');
mongoose.connect(process.env.MONGODB_URL);