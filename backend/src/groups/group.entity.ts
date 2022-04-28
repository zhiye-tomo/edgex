import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterInsert,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @CreateDateColumn()
  readonly created_at: Date;

  @UpdateDateColumn()
  readonly updated_at;

  @DeleteDateColumn()
  readonly deletedAt: Date;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Tag with id: ', this.id);
  }
}
