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

minionsRouter.get('/:minionId/work', (req, res, next) => {
  const work = getAllFromDatabase('work').filter( minionWork => {
      return minionWork.minionId === req.params.minionId;
  });
  res.send(work);
});

minionsRouter.put('/:minionId', (req, res, next) => {
  let updatedMinion = updateInstanceInDatabase('minions', req.body);
  res.send(updatedMinion);
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
  if (req.body.minionId === req.params.minionId) {
    let updatedWork = updateInstanceInDatabase('work', req.body)
    res.send(updatedWork);
  } else {
    res.status(400).send();
  }
});

minionsRouter.post('/', (req, res, next) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
  const newWork = req.body;
  newWork.minionId = req.params.minionId;
  const addedWork = addToDatabase('work', newWork);
  res.status(201).send(addedWork);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
  const removedMinion = deleteFromDatabasebyId('minions', req.params.minionId);
  res.status(204).send();
});

minionsRouter.delete('/:minionId/work/:workId', (req, res, next) => {
  const removedWork = deleteFromDatabasebyId('work', req.params.workId);
  res.status(204).send();
});
