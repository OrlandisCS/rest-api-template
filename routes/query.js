const { Router } = require('express');
const { query } = require('../controllers/query');
const router = Router();

router.get('/:collection/:q', query)
module.exports = router