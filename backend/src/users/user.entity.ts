import { Article } from 'src/articles/article.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  ManyToMany,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @ManyToMany((type) => Article, (article) => article.users)
  articles: User[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ', this.id);
  }
}
