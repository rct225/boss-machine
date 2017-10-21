const express = require('express');
const apiRouter = express.Router();



module.exports = apiRouter;

const minionsRouter = require('./minions');

apiRouter.use('/minions', minionsRouter);

const ideasRouter = require('./ideas');

apiRouter.use('/ideas', ideasRouter);
