import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => ({
    type: 'mongodb',
    url: configService.get<string>('DB_HOST'),
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
  }),
  inject: [ConfigService],
};
