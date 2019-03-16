import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { environment } from '../../environments/environment';

export class AuthService {
    private readonly AUTH_PREFIX = 'Bearer ';

    async checkAuthentication(req: Request, res: Response, next: NextFunction) {
        try {
            const token = this.getTokenFromRequest(req);

            await this.verifyToken(token);

            next();
        } catch (error) {
            next(error);
        }
    }

    private getTokenFromRequest(req: Request) {
        const authorizationHeader = req.headers.authorization as string;

        if (authorizationHeader) {
            const token = authorizationHeader.replace(this.AUTH_PREFIX, '');

            return token;
        }

        return '';
    }

    private verifyToken(token: string) {
        return jwt.verify(token, environment.tokenSecret);
    }
}
