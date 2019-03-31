import { Response, Request, Router } from 'express';

import { asyncResponse } from '@utils/async.utils';
import { AuthService } from '@services/auth.service';
import { ApiResponseModel } from '@models/api-response.model';

const router = Router();

const authService = new AuthService();

router.post('/signin', asyncResponse(async (req: Request, res: Response) => {
    const auth = await authService.signIn(req.body.email, req.body.password);

    res.json(auth);
}));

router.post('/signup', asyncResponse(async (req: Request, res: Response) => {
    await authService.signUp(req.body);

    res.json(new ApiResponseModel('Signed up successfully'));
}));

export default router;
