import express, {Request, Response, NextFunction} from 'express';
import {Register, Login, getUserAndMovie, Logout} from '../controller/userController'

const router = express.Router();

/* GET users listing. */
router.post('/register', Register);
router.post('/login', Login);
router.get('/get-user', getUserAndMovie);
router.get('/logout', Logout);



export default router
