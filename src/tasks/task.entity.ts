import { ObjectId } from 'mongodb';
import {
  Entity,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tasks')
export class Task {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  text: string;

  @Column()
  date: string;

  @Column()
  subLevel: number;

  @Column()
  parentId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
