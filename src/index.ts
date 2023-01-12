import Application from './shared/application';
import userRouter from './components/users/router';

const application = new Application(userRouter);

application.createServer();
