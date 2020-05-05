const express = require('express');
const router = express.Router();

const miscController = require('../controllers/misc');

router.get('/contactus', miscController.getContactUs);
router.post('/contactus', miscController.postContactUs);

router.get('/aboutus', miscController.getAboutUs);

module.exports = router;