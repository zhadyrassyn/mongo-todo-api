// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log('obj ', obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }

  console.log('connected to MongoDB server');
  const db = client.db('TodoApp')

  db.collection('Todos').findOneAndUpdate({
    _id: ObjectID("5b8437d068696598502f86e8")
  }, {
    $set: {
      completed: false
    },
  },{
      returnOriginal: false
  }).then(result => {
    console.log('result ', result);
  }, error => console.log('error ', error))

  client.close();
});