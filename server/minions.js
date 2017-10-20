const express = require('express');

const { getAllFromDatabase,
        getFromDatabaseById,
        addToDatabase,
        updateInstanceInDatabase,
        deleteFromDatabasebyId,
        deleteAllFromDatabase
      } = require('./db');

const minionsRouter = express.Router();

module.exports = minionsRouter;

minionsRouter.param('minionId', (req, res, next, id) => {
  const foundMinion = getFromDatabaseById('minions', req.params.minionId);
  if (foundMinion) {
    req.minion = foundMinion;
    next();
  } else {
    res.status(404).send();
  }
})
// Get all expressions
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});

minionsRouter.get('/:minionId', (req, res, next) => {
  res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  let updatedMinion = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
});

minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const removedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  res.status(204).send();
});
