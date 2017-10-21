const express = require('express');

const { getAllFromDatabase,
        getFromDatabaseById,
        addToDatabase,
        updateInstanceInDatabase,
        deleteFromDatabasebyId,
        deleteAllFromDatabase
      } = require('./db');

const ideasRouter = express.Router();

module.exports = ideasRouter;

ideasRouter.param('id', (req, res, next, id) => {
  const foundIdea = getFromDatabaseById('ideas', id);
  if (foundIdea) {
    req.idea = foundIdea;
    next();
  } else {
    res.status(404).send();
  }
})



const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// Get all expressions
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:id', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put('/:id', (req, res, next) => {
  let updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

ideasRouter.delete('/:id', (req, res, next) => {
  const removedIdea = deleteFromDatabasebyId('ideas', req.params.id);
  res.status(204).send();
});
