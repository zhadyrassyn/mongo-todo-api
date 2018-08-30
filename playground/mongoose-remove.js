const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.deleteMany({}).then(result => {
//   console.log('result ', result);
// })



Todo.findByIdAndRemove('5b87b98c25a668776927d538').then(todo => {
  console.log(todo);
})