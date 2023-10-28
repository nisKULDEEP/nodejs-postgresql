import { DataSource } from 'typeorm';
import { Person } from './entity/Person';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Kuldeep@121',
  database: 'colabx',
  synchronize: true,
  logging: true,
  entities: [Person],
  subscribers: [],
  migrations: []
});
