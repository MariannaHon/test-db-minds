import { Router } from 'express';

const router = Router();

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

import { registerUserSchema, loginUserSchema } from '../validation/auth.js';
import { registerUserController, loginUserController, refreshUserSessionController, logoutUserController } from '../controllers/auth.js';

router.post('/register', validateBody(registerUserSchema), ctrlWrapper(registerUserController),
);

router.post('/login', validateBody(loginUserSchema), ctrlWrapper(loginUserController),
);

router.post('/refresh', ctrlWrapper(refreshUserSessionController));


router.post('/logout', ctrlWrapper(logoutUserController));


export default router;
