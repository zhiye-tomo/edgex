import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';

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

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ', this.id);
  }
}
