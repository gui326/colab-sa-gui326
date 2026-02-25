import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitizenReport } from './entities/report.entity';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CitizenReport])],
  providers: [ReportsService],
  controllers: [ReportsController],
})
export class ReportsModule {}
