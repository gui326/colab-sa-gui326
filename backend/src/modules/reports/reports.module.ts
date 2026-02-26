import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CitizenReport } from './entities/report.entity';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { AiModule } from 'src/ai/ai.module';
import { CitizenReportAiAnalysis } from './entities/reportAiAnalysis.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CitizenReport, CitizenReportAiAnalysis]),
    AiModule,
  ],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
