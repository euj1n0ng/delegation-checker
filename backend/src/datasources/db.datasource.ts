import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

interface IConfig {
  name: string;
  connector: string;
  url?: string;
  host?: string;
  port?: number;
  user?: string;
  password?: string;
  database?: string;
}

const config = {
  name: 'db',
  connector: 'mysql',
  url: '',
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'secret',
  database: 'delegation-checker'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db';

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: IConfig = config,
  ) {
    if (process.env.DB_HOST) {
      dsConfig.host = process.env.DB_HOST;
    }
    if (process.env.DB_PORT) {
      dsConfig.port = Number(process.env.DB_PORT);
    }
    if (process.env.DB_USER) {
      dsConfig.user = process.env.DB_USER;
    }
    if (process.env.DB_PASSWORD) {
      dsConfig.password = process.env.DB_PASSWORD;
    }
    super(dsConfig);
  }
}
