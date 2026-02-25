import { Controller, Post, Body, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly service: ReportsService) {}

  @Post()
  create(@Body() dto: CreateReportDto) {
    return this.service.create(dto);
  }
}
