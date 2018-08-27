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


  //deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then(result => {
  //   console.log('result ', result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Delete one'}).then(result => {
  //   console.log('result ', result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({text: 'Delete one'}).then(result => {
  //   console.log('result ', result);
  // })

  console.log('deleteMany');
  db.collection('Users').deleteMany({name: 'Daniyar'}).then(result => {
    console.log('result ', result);
  }, error => {
    console.log('error ', error);
  })

  console.log('findOneAndDelete');
  db.collection('Users').findOneAndDelete({_id: ObjectID("5b842f3a86685b145275fedf")})
    .then(result => {
      console.log('result ', result);
    }, errorMessage => {
      console.log('errorMessage ', errorMessage);
    });
  client.close();
});