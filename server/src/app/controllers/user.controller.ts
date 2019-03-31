import { Response, Request, Router } from 'express';

import { asyncResponse } from '@utils/async.utils';
import { UserService } from '@services/user.service';

const router = Router();

const userService = new UserService();

router.get('/:id', asyncResponse(async (req: Request, res: Response) => {
    const user = await userService.getUser(req.params.id);

    res.json(user);
}));

export default router;
