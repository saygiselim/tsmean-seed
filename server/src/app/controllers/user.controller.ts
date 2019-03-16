import { Response, Request, Router } from 'express';

import { asyncResponse } from '../utils/async.utils';
import { UserService } from '../services/user.service';

const router = Router();

const userService = new UserService();

router.get('/:id', asyncResponse(async (req: Request, res: Response) => {
    const user = await userService.getUser(req.params.id);

    res.json(user);
}));

router.put('/:id', asyncResponse(async (req: Request, res: Response) => {
    const result = await userService.updateUser(req.params.id, req.body);

    res.json(result);
}));

export default router;
