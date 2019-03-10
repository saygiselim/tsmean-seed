import { Response, Request, NextFunction } from 'express';

export const asyncResponse = callback => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(callback(req, res, next)).catch(err => next(err));
};
