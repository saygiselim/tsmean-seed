import { Response, Request, Router } from 'express';

import { asyncResponse } from '../utils/async.utils';
import { UserSchema } from '../schemas/user.schema';

const router = Router();

router.get('/', asyncResponse(async (req: Request, res: Response) => {
    const users = await UserSchema.find().then();

    res.json(users);
}));

router.post('/', asyncResponse(async (req: Request, res: Response) => {
    const user = new UserSchema(req.body);

    await user.save();

    res.json(user);
}));

router.get('/:id', asyncResponse(async (req: Request, res: Response) => {
    const user = await UserSchema.findById(req.params.id).then();

    res.json(user);
}));

router.put('/:id', asyncResponse(async (req: Request, res: Response) => {
    const result = await UserSchema.findByIdAndUpdate(req.params.id, req.body).then();

    res.json(result);
}));

router.delete('/:id', asyncResponse(async (req: Request, res: Response) => {
    const result = await UserSchema.findByIdAndDelete(req.params.id).then();

    res.json(result);
}));

export default router;
