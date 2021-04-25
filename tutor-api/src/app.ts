import 'reflect-metadata';
import {
  createExpressServer, getMetadataArgsStorage,
  RoutingControllersOptions,
  useContainer as useRoutingControllersContainer
} from 'routing-controllers';
import {Express} from 'express';
import {Container} from 'typedi';
import {createConnection, useContainer as useTypeOrmContainer} from 'typeorm';
import {of} from 'rxjs';
import {map, switchMap, tap} from 'rxjs/operators';
import {fromPromise} from 'rxjs/internal-compatibility';
import {roleChecker} from './auth/role.checker';
import {getCurrentUser} from './auth/current-user';
import {schedule} from 'node-cron';
import {ViolationService} from './services/violation.service';
import {validationMetadatasToSchemas} from 'class-validator-jsonschema';
import {routingControllersToSpec} from 'routing-controllers-openapi';
import {defaultMetadataStorage} from 'class-transformer/cjs/storage';
import * as swaggerUiExpress from 'swagger-ui-express';

const expressConfig: RoutingControllersOptions = {
  controllers: [`${__dirname}/../build/controllers/*.js`],
  routePrefix: '/api',
  authorizationChecker: roleChecker,
  currentUserChecker: getCurrentUser,
  cors: {
    origin: '*'
  }
};

of([])
  .pipe(map(() => useRoutingControllersContainer(Container)))
  .pipe(map(() => useTypeOrmContainer(Container)))
  .pipe(switchMap(() => fromPromise(createConnection())))
  .pipe(switchMap(conn => fromPromise(conn.runMigrations())))
  .pipe(map((): Express => createExpressServer(expressConfig)))
  .pipe(tap(() => scheduleViolation()))
  .pipe(tap(app => openApiSpec(app)))
  .subscribe(app => app.listen(process.env.PORT || 3000));

function scheduleViolation(): void {
  const violationService = Container.get(ViolationService);
  schedule('30 * * * *', async () => {
    await violationService.findViolation();
    await violationService.findAverageSpeedViolations();
  });
}

function openApiSpec(app: Express): void {
  // Parse class-validator classes into JSON Schema:
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  });

  const storage = getMetadataArgsStorage();
  const spec = routingControllersToSpec(storage, expressConfig, {
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          scheme: 'bearer',
          type: 'http',
          bearerFormat: 'JWT'
        },
      },
    },
    info: {
      description: 'Generated with `routing-controllers-openapi`',
      title: 'A sample API',
      version: '1.0.0',
    },
  });
  app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(spec));
}
