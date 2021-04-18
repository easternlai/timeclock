const express = require('express');
const entriesRouter = express.Router();
const {requiredAuth} = require('../middleware/auth');
const {addEntry, getEmployeeEntries} = require('../controllers/entiresController');

entriesRouter.put('/addentry', requiredAuth, addEntry);

entriesRouter.get('/employeetimecard', requiredAuth, getEmployeeEntries);

module.exports =  entriesRouter;
