import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { environment } from '../../environments/environment';
import { UserService } from './user.service';
import { AuthModel } from '../models';
import { UserModel } from '../schemas';

export class AuthService {
    private readonly AUTH_PREFIX = 'Bearer ';

    private userService = new UserService();

    async signUp(user: UserModel) {
        return await this.userService.createUser(user);
    }

    async signIn(email: string, password: string) {
        const user = await this.userService.getUserByEmail(email);

        if (!user || !(await user.verifyPassword(password))) {
            throw Error('Email or password is not valid!');
        }

        return new AuthModel(user.generateJWT());
    }

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

