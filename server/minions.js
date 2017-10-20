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

// Get all expressions
minionsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('minions'));
});
