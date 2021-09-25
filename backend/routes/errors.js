const router = require('express').Router();
const errorMessage = require('../controllers/errors');

router.get('*', errorMessage);

module.exports = router;
