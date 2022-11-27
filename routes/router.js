const express = require('express');
const {vista_Index} = require('../controllers/pageControllers');
const router = express.Router();

router.get('/', vista_Index);

module.exports = {
    routes: router
}