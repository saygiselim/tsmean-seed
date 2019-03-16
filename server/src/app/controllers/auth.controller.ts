import { Response, Request, Router } from 'express';

import { asyncResponse } from '../utils/async.utils';
import { UserSchema } from '../schemas/user.schema';

const router = Router();

router.post('/signin', asyncResponse(async (req: Request, res: Response) => {
    const user = await UserSchema.findOne({ email: req.body.email }).then();

    if (!user || !(await user.verifyPassword(req.body.password))) {
        throw Error('Email or password is not valid!');
    }

    const jwt = user.generateJWT();

    res.json({ token: jwt });
}));

router.post('/signup', asyncResponse(async (req: Request, res: Response) => {
    const user = new UserSchema(req.body);

    await user.save();

    res.json({ message: 'User signed up successfully' });
}));

export default router;
