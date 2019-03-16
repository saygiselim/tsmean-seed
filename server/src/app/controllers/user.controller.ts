import { Response, Request, Router } from 'express';

import { asyncResponse } from '../utils/async.utils';
import { PostSchema } from '../schemas/post.schema';

const router = Router();

router.get('/:id', asyncResponse(async (req: Request, res: Response) => {
    const user = await PostSchema.findById(req.params.id).then();

    res.json(user);
}));

router.put('/:id', asyncResponse(async (req: Request, res: Response) => {
    const result = await PostSchema.findByIdAndUpdate(req.params.id, req.body).then();

    res.json(result);
}));

export default router;
