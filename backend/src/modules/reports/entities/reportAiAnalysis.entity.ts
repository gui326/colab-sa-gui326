import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CitizenReport } from './report.entity';
import { ReportPriorityEnum } from '../enums/report.enums';

@Entity('citizen_report_ai_analysis')
export class CitizenReportAiAnalysis {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  category!: string;

  @Column({
    type: 'simple-enum',
    enum: ReportPriorityEnum,
  })
  priority!: ReportPriorityEnum;

  @Column('text')
  technical_summary!: string;

  @OneToOne(() => CitizenReport, (report) => report.ai_analysis)
  @JoinColumn({ name: 'report_id' })
  report!: CitizenReport;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
