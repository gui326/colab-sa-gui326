import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CitizenReport } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(CitizenReport)
    private readonly repository: Repository<CitizenReport>,
  ) {}

  async create(data: CreateReportDto) {
    const report = this.repository.create(data);
    return this.repository.save(report);
  }
}
