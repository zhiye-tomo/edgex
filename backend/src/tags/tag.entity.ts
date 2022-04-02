import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Tag with id: ', this.id);
  }
}
