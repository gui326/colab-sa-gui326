import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CitizenReport } from './entities/report.entity';
import { CreateReportDto } from './dto/create-report.dto';
import { CitizenReportAiAnalysis } from './entities/reportAiAnalysis.entity';
import { GeminiService } from 'src/ai/gemini.service';
import { validateEnum } from 'src/common/utils/enum-validator';
import { ReportPriorityEnum } from './enums/report.enums';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    @InjectRepository(CitizenReport)
    private readonly repository: Repository<CitizenReport>,
    @InjectRepository(CitizenReportAiAnalysis)
    private readonly aiRepository: Repository<CitizenReportAiAnalysis>,
    private readonly geminiService: GeminiService,
  ) {}

  async create(data: CreateReportDto) {
    const report = await this.repository.save(data);

    try {
      const aiResult = await this.geminiService.analyzeReport(data);

      const aiEntity = this.aiRepository.create({
        category: aiResult.categoria,
        priority: validateEnum(ReportPriorityEnum, aiResult.prioridade),
        technical_summary: aiResult.resumo_tecnico,
        report,
      });

      await this.aiRepository.save(aiEntity);

      this.logger.debug(
        `Análise IA salva com sucesso para report ${report.id}`,
      );
    } catch (error) {
      this.logger.error(
        `Falha ao gerar/salvar análise IA para report ${report.id}`,
        error,
      );
    }

    return report;
  }
}
