import express from express;
const router = express.Router();

import {register, login} from "../controllers/auth.controllers.js"

router.get(/register , register_user);

router.get(/login , login_user);

