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

  // db.collection('Todos').find({
  //   _id: new ObjectID('5b8437d068696598502f86e8')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Total count ${count}`);
  // }, (err) => {
  //   console.log('Unable to fetch todos', err)
  // });

  db.collection('Users').find({name: 'Andrew'}).toArray().then((result) => {
    console.log('Total count', result);
  }, (err) => {
    console.log('Unable to fetch todos', err)
  });
  client.close();
});