import { Entity, Column } from 'typeorm';

@Entity('users')
export class Task {
  @Column()
  text: string;

  @Column()
  date: string;

  @Column()
  subLevel: number;

  @Column()
  parentId: string;
}
