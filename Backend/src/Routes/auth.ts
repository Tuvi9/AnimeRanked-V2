import express from 'express';
import signupController from '../controllers/signupController';
import signinController from '../controllers/signinController';
const router = express.Router();

router.post('/create', signupController.createUser);
router.post('/login', signinController.loginUser)

export default router;