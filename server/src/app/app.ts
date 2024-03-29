import express from 'express';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import compression from 'compression';
import expressValidator from 'express-validator';
import lusca from 'lusca';
import mongoose from 'mongoose';
import helmet from 'helmet';

import { environment } from '@environment';
import { ApiResponseModel } from '@models/api-response.model';
import controllersRouter from './controllers';

export class App {
    private readonly DIST_FOLDER = path.join(process.cwd(), 'dist');

    express = express();

    constructor() {
        this.initDB();
        this.initExpress();
        this.initControllers();
        this.initViewEngine();
        this.initErrorHandlers();
    }

    private initDB() {
        // let's set promise library
        mongoose.Promise = global.Promise;

        // and connect to mongodb instance
        mongoose
            .connect(environment.connectionURI, { useNewUrlParser: true })
            .then(() => console.log('Connection established.'))
            .catch(err => console.log('MongoDB connection error. Please make sure MongoDB is running.' + err));
    }

    private initExpress() {
        this.express.use(compression());
        this.express.use(expressValidator());
        this.express.use(helmet());

        this.express.use(lusca.xframe('SAMEORIGIN'));
        this.express.use(lusca.xssProtection(true));

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));

        this.express.set('port', environment.port);
    }

    private initControllers() {
        this.express.use('/api', controllersRouter);
    }

    private initViewEngine() {
        this.express.engine('html', ejs.renderFile);
        this.express.set('view engine', 'html');
        this.express.set('views', path.join(this.DIST_FOLDER, 'client'));

        // Serve static files from /client
        this.express.get('*.*', express.static(path.join(this.DIST_FOLDER, 'client')));

        // All regular routes
        this.express.get('*', (req, res) => {
            // this is for i18n
            const supportedLocales = ['en'];
            const defaultLocale = 'en';
            const matches = req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)/);

            // check if the requested url has a correct format '/locale' and matches any of the supportedLocales
            const locale = (matches && supportedLocales.indexOf(matches[1]) !== -1) ? matches[1] : defaultLocale;

            res.render(`${locale}/index`, { req });
        });
    }

    private initErrorHandlers() {
        this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.status(400).json(new ApiResponseModel(err.message));
            // Expressjs specific logging, catches unhandled exceptions in router
        });

        process.on('unhandledRejection', (reason, p) => {
            console.log('Unhandled Rejection at:', p, 'reason:', reason);
            // Application specific logging, catches unhandled exceptions in node environment
        });
    }
}
