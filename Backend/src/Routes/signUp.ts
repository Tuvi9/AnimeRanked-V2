const express = require('express');
const router = express.Router();
const controller = require ('../controllers/signUpIn.ts')
const cors = require('cors')

router.use(cors)
router.post('/create', controller.createUser)