import express from 'express';
const router = express.Router();

import {register_user, login_user, Forget_Password, Reset_password , User_register_verification } from "../controllers/auth.controllers.js";

router.post('/register' , register_user);

router.post('/register_verification' , User_register_verification);

router.post('/login', login_user);

router.post('/forget_password' , Forget_Password);

router.post('/reset_password' , Reset_password);

export default router;
