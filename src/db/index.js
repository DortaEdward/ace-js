const mongoose = require('mongoose');
const MONGOURI = process.env.MONGOURI;

mongoose.connect(MONGOURI);

const { connection: db } = mongoose;

db.on('connected', () => {
  console.log('Db connected');
});
db.on('disconnected', () => {
  console.log('Db disconnected');
});
db.on('error', err => {
  console.log('There was an error:', err);
});

module.exports = db;