import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('citizen_reports')
export class CitizenReport {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  title!: string;

  @Column('text')
  description!: string;

  @Column({ length: 255 })
  location!: string;

  @CreateDateColumn()
  createdAt!: Date;
}
