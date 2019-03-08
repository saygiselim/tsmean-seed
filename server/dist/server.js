"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const ejs_1 = __importDefault(require("ejs"));
const compression_1 = __importDefault(require("compression"));
const express_validator_1 = __importDefault(require("express-validator"));
const lusca_1 = __importDefault(require("lusca"));
const mongoose_1 = __importDefault(require("mongoose"));
const environment_1 = require("./environments/environment");
const controllers_1 = __importDefault(require("./app/controllers"));
class Server {
    constructor() {
        this.DIST_FOLDER = path_1.default.join(process.cwd(), 'dist');
        this.expressApp = express_1.default();
        this.initExpress();
        this.initControllers();
        this.initViewEngine();
        this.initDB();
    }
    initControllers() {
        this.expressApp.use('/api', controllers_1.default);
    }
    initViewEngine() {
        // Serve static files from /browser
        this.expressApp.get('*.*', express_1.default.static(path_1.default.join(this.DIST_FOLDER, 'browser')));
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
    initExpress() {
        this.expressApp.use(compression_1.default());
        this.expressApp.use(express_validator_1.default());
        this.expressApp.use(lusca_1.default.xframe('SAMEORIGIN'));
        this.expressApp.use(lusca_1.default.xssProtection(true));
        this.expressApp.use(body_parser_1.default.json());
        this.expressApp.use(body_parser_1.default.urlencoded({ extended: true }));
        this.expressApp.engine('html', ejs_1.default.renderFile);
        this.expressApp.set('view engine', 'html');
        this.expressApp.set('views', path_1.default.join(this.DIST_FOLDER, 'browser'));
        /**
         * Start Express server.
         */
        this.expressApp.set('port', 3001);
        this.expressApp.listen(this.expressApp.get('port'), () => {
            console.log('Server is running at http://localhost:%d in %s mode', this.expressApp.get('port'), this.expressApp.get('env'));
            console.log('Press CTRL-C to stop\n');
        });
    }
    initDB() {
        console.log('Connecting to db on: ' + environment_1.environment.mongodbURI);
        // let's set promise library
        mongoose_1.default.Promise = global.Promise;
        // and connect to mongodb instance
        mongoose_1.default
            .connect(environment_1.environment.mongodbURI, { useNewUrlParser: true })
            .then(() => console.log('Connection established.'))
            .catch(err => console.log('MongoDB connection error. Please make sure MongoDB is running.' + err));
    }
}
const server = new Server();
//# sourceMappingURL=server.js.map