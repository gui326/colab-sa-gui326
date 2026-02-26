import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  UpdateDateColumn,
} from 'typeorm';

import { CitizenReportAiAnalysis } from './reportAiAnalysis.entity';

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
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;

  @OneToOne(() => CitizenReportAiAnalysis, (analysis) => analysis.report)
  ai_analysis!: CitizenReportAiAnalysis;
}
