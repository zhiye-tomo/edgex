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

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Tag with id: ', this.id);
  }
}
