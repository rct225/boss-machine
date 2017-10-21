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

ideasRouter.param('ideaId', (req, res, next, id) => {
  const foundIdea = getFromDatabaseById('ideas', req.params.ideaId);
  if (foundIdea) {
    req.idea = foundIdea;
    next();
  } else {
    res.status(404).send();
  }
})
// Get all expressions
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
  let updatedIdea = updateInstanceInDatabase('ideas', req.body);
  res.send(updatedIdea);
});

ideasRouter.post('/', (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
  const removedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId);
  res.status(204).send();
});
