import express from 'express';
import controller from '../controllers/signUpIn';
const router = express.Router();

router.post('/create', controller.createUser);

export default router;