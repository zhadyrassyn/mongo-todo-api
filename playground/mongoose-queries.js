const {ObjectID} = require('mongodb')

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const id = '5b857c9d8ec7291edf859dfb';

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos ', todos);
//
// });
//
// Todo.findOne({
//   _id: id
// }).then(todo => {
//   console.log('todo ', todo);
// });

let findById = User.findById(id).then(todo => {
  if (!todo) {
    return console.log('Не понравилось');
  }
  console.log('Todo By Id', todo);
}).catch(e => console.log(e))
