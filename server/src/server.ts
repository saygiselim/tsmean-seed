
import { App } from './app/app';

const app = new App();

const server = app.express.listen(app.express.get('port'), () => {
    console.log('Server is running at http://localhost:%d in %s mode', app.express.get('port'), app.express.get('env'));
    console.log('Press CTRL-C to stop\n');
});

export default server;
