// import { Task } from 'src/tasks/task.entity';
// import { DataSource } from 'typeorm';

// export const AppDataSource = new DataSource({
//   type: 'mongodb',
//   url: process.env.DB_URL,
//   entities: [Task],
//   synchronize: true,
//   logging: true,
// });

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mongodb',
    url: configService.get<string>('DB_HOST'),
    port: 27017,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
  }),
  inject: [ConfigService],
};
