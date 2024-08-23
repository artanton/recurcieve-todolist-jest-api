import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { typeOrmAsyncConfig } from './config/typeorm.config';
// const { DB_HOST } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      'mongodb+srv://Anton:t7c1GLgc8FJMEIE2@cluster0.b5j4k.mongodb.net/a-sol-recursive-todo-list?retryWrites=true&w=majority&appName=Cluster0',
      // process.env.DB_HOST,
      // DB_HOST,
    ),
    TasksModule,

    // TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
  ],
})
export class AppModule {}
