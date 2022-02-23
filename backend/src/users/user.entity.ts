import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  // AfterUpdate,
  // AfterRemove,
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

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id: ', this.id);
  }
  // @AfterUpdate()
  // logUpdate() {
  //   console.log('Updated User with id: ', this.id);
  // }
  // @AfterRemove()
  // logRemove() {
  //   console.log('Removed User with id: ', this.id);
  // }
}