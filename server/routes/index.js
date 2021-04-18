const express = require('express');
const authRouter = require('./auth');
const entriesRouter = require('./entries');
const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/entries', entriesRouter);

module.exports = apiRouter;