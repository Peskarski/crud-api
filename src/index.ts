import Application from './shared/application';
import userRouter from './components/users/router';

const isMulti = process.argv.includes('--multi');

const application = new Application(userRouter);

if (isMulti) {
  application.createMultiServer();
} else {
  application.createServer();
}
