const express = require('express')
const { filterByDate } = require('../controllers/index.controller')
const router = express.Router()

// Sets endpoint
router.get('/filter-date/:start/:end', filterByDate)

module.exports = router