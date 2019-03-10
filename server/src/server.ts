import express from 'express';
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import ejs from 'ejs';
import compression from 'compression';
import expressValidator from 'express-validator';
import lusca from 'lusca';
import mongoose from 'mongoose';

import { environment } from './environments/environment';
import controllersRouter from './app/controllers';

class Server {
    readonly DIST_FOLDER = path.join(process.cwd(), 'dist');

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

        this.express.use(lusca.xframe('SAMEORIGIN'));
        this.express.use(lusca.xssProtection(true));

        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: true }));

        this.express.set('port', environment.port);
        this.express.listen(this.express.get('port'), () => {
            console.log('Server is running at http://localhost:%d in %s mode', this.express.get('port'), this.express.get('env'));
            console.log('Press CTRL-C to stop\n');
        });
    }

    private initControllers() {
        this.express.use('/api', controllersRouter);
    }

    private initViewEngine() {
        this.express.engine('html', ejs.renderFile);
        this.express.set('view engine', 'html');
        this.express.set('views', path.join(this.DIST_FOLDER, 'browser'));

        // Serve static files from /browser
        this.express.get('*.*', express.static(path.join(this.DIST_FOLDER, 'browser')));

        // All regular routes
        this.express.get('*', (req, res) => {
            // this is for i18n
            const supportedLocales = ['en', 'de', 'hu', 'cs', 'sk', 'pl'];
            const defaultLocale = 'en';
            const matches = req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)/);

            // check if the requested url has a correct format '/locale' and matches any of the supportedLocales
            const locale = (matches && supportedLocales.indexOf(matches[1]) !== -1) ? matches[1] : defaultLocale;

            res.render(`${locale}/index`, { req });
        });
    }

    private initErrorHandlers() {
        this.express.use((err: any, req: Request, res: Response, next: NextFunction) => {
            res.status(400).send(err);
        });

        process.on('unhandledRejection', (reason, p) => {
            console.log('Unhandled Rejection at:', p, 'reason:', reason);
            // Application specific logging, throwing an error, or other logic here
        });
    }
}

const server = new Server();
