const express = require('express')
const router = express()
const controller = require('../controllers/controller')

router.post('/form',controller.sendimentalAnalysis)
router.get('/graph',controller.getChartData);
router.get('/table',controller.getTableData)

module.exports = router 