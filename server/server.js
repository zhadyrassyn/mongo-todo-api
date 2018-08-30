const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.status(201).send(doc);
  }, (e) => {
    res.status(400).send(e);
  })
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

// GET /todos/123123
app.get('/todos/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send()
  }

  Todo.findById(id).then(todo => {
    if(!todo) {
      return res.status(404).send();
    }
    res.send({todo});
  }).catch(e => {
    res.status(400).send(e);
  });

});

// DELETE /todos/:id
app.delete('/todos/:id', (req, res) => {
  const id = req.params.id
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then(todo => {
    if(!todo) {
      return res.status(404).send();
    }

    return res.send({todo});
  }).catch(err => {
    res.status(400).send();
  })
});

app.patch('/todos/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);
  console.log('body ', body);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then(todo => {
    if(!todo) {
      return res.status(404).send(todo);
    }

    res.send({todo})
  }).catch(e => res.status(400).send(e));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`started on port ${port}`);
});

module.exports = {app}