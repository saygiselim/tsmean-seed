import { Response, Request, Router } from 'express';

import { asyncResponse } from '../utils/async.utils';
import { PostSchema, PostModel } from '../schemas/post.schema';
import { PostService } from '../services/post.service';

// this should be a nested route of users route so we have to set mergeParams true
// parent path = users/:userId
const router = Router({ mergeParams: true });

const postService = new PostService();

router.get('/', asyncResponse(async (req: Request, res: Response) => {
    const posts = await postService.getPosts(req.params.userId);

    res.json(posts);
}));

router.post('/', asyncResponse(async (req: Request, res: Response) => {
    const post = await postService.createPost(req.params.userId, req.body);

    res.json(post);
}));

router.get('/:id', asyncResponse(async (req: Request, res: Response) => {
    const post = await postService.getPost(req.params.id, req.params.userId);

    res.json(post);
}));

router.put('/:id', asyncResponse(async (req: Request, res: Response) => {
    const result = await postService.updatePost(req.params.id, req.params.userId, req.body);

    res.json(result);
}));

router.delete('/:id', asyncResponse(async (req: Request, res: Response) => {
    const result = await postService.deletePost(req.params.id, req.params.userId);

    res.json(result);
}));

export default router;
