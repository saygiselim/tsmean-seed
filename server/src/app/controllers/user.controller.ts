import { Response, Request, Router } from 'express';

import userSchema from '../schemas/user.schema';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
    const users = await userSchema.find().then();

    res.send(users);
});

router.post('/', (req: Request, res: Response) => {
    const user = new userSchema(req.body);

    user.save(err => {
        if (err) {
            return res.status(400).send(err);
        }

        return res.status(200).send(user);
    });
});

export default router;
