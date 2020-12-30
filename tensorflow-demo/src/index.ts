import 'reflect-metadata';
import {Container} from 'typedi';
import {AppService} from './services/app.service';

const app = Container.get<AppService>(AppService);

document.addEventListener('DOMContentLoaded', () => {
  app.init();
});
