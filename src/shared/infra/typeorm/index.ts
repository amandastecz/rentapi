import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
  host: string;
}

getConnectionOptions().then(options => {
  // const newOptions = options as IOptions;
  // newOptions.host = 'database_ignite'; //Essa opção deverá ser EXATAMENTE o nome dado ao service do banco de dados
  createConnection({
    ...options,
  });
});

export default async (): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  return createConnection(Object.assign(defaultOptions, {
    database: process.env.NODE_ENV === 'test' ? "rentx_test" : defaultOptions.database
  }));
}