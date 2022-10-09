const mongoose = require('mongoose')

// Definindo o schema
const schema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  password: String,
});

const Model = mongoose.model('customers', schema);

/*
const register = new Model({
  name: 'Kaio',
  age: 22,
  email: 'kaio_costa222@hotmail.com',
  password: '123456',
});

register.save();
*/

module.exports = Model
