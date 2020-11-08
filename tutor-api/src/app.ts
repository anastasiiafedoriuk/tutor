import 'reflect-metadata';
import {
  createExpressServer,
  RoutingControllersOptions,
  useContainer as useRoutingControllersContainer
} from 'routing-controllers';
import {Express} from 'express';
import {Container} from 'typedi';
import {createConnection, useContainer as useTypeOrmContainer} from 'typeorm';
import {of} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';

const expressConfig: RoutingControllersOptions = {
  controllers: [`${__dirname}/../build/controllers/*.js`],
  routePrefix: 'api'
};

of([])
  .pipe(map(() => useRoutingControllersContainer(Container)))
  .pipe(map(() => useTypeOrmContainer(Container)))
  .pipe(switchMap(() => fromPromise(createConnection())))
  .pipe(map((): Express => createExpressServer(expressConfig)))
  .subscribe(app => app.listen(process.env.PORT || 3000));
