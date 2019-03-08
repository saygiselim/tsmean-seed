import express from 'express';
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

    expressApp = express();

    constructor() {
        this.initExpress();
        this.initControllers();
        this.initViewEngine();
        this.initDB();
    }

    private initControllers() {
        this.expressApp.use('/api', controllersRouter);
    }

    private initViewEngine() {
        // Serve static files from /browser
        this.expressApp.get('*.*', express.static(path.join(this.DIST_FOLDER, 'browser')));

        // All regular routes
        this.expressApp.get('*', (req, res) => {
            // this is for i18n
            const supportedLocales = ['en', 'de', 'hu', 'cs', 'sk', 'pl'];
            const defaultLocale = 'en';
            const matches = req.url.match(/^\/([a-z]{2}(?:-[A-Z]{2})?)/);

            // check if the requested url has a correct format '/locale' and matches any of the supportedLocales
            const locale = (matches && supportedLocales.indexOf(matches[1]) !== -1) ? matches[1] : defaultLocale;

            res.render(`${locale}/index`, { req });
        });
    }

    private initExpress() {
        this.expressApp.use(compression());
        this.expressApp.use(expressValidator());
        this.expressApp.use(lusca.xframe('SAMEORIGIN'));
        this.expressApp.use(lusca.xssProtection(true));
        this.expressApp.use(bodyParser.json());
        this.expressApp.use(bodyParser.urlencoded({ extended: true }));

        this.expressApp.engine('html', ejs.renderFile);
        this.expressApp.set('view engine', 'html');
        this.expressApp.set('views', path.join(this.DIST_FOLDER, 'browser'));

        /**
         * Start Express server.
         */
        this.expressApp.set('port', 3001);
        this.expressApp.listen(this.expressApp.get('port'), () => {
            console.log('Server is running at http://localhost:%d in %s mode', this.expressApp.get('port'), this.expressApp.get('env'));
            console.log('Press CTRL-C to stop\n');
        });
    }

    private initDB() {
        console.log('Connecting to db on: ' + environment.mongodbURI);

        // let's set promise library
        mongoose.Promise = global.Promise;

        // and connect to mongodb instance
        mongoose
            .connect(environment.mongodbURI, { useNewUrlParser: true })
            .then(() => console.log('Connection established.'))
            .catch(err => console.log('MongoDB connection error. Please make sure MongoDB is running.' + err));
    }
}

const server = new Server();
