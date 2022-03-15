import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  AfterInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/user.entity';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToMany((type) => User, (user) => user.articles, {
    cascade: true,
  })
  // @Column()
  // userId: number;

  // @Column()
  // author: string;
  // @CreateDateColumn()
  // readonly createdAt: Date;

  // @UpdateDateColumn()
  // readonly updatedAt: Date;
  @JoinTable()
  users: User[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted Article with id: ', this.id);
  }
}
