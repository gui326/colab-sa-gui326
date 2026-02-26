/// <reference types="jest" />

import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ReportsService } from './reports.service';
import { CitizenReport } from './entities/report.entity';
import { CitizenReportAiAnalysis } from './entities/reportAiAnalysis.entity';
import { GeminiService } from '../../ai/gemini.service';

describe('ReportsService (Integration)', () => {
  let module: TestingModule;
  let service: ReportsService;
  let reportRepository: Repository<CitizenReport>;
  let aiRepository: Repository<CitizenReportAiAnalysis>;

  const mockGeminiService = {
    analyzeReport: jest.fn(),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [CitizenReport, CitizenReportAiAnalysis],
          synchronize: true,
          dropSchema: true,
        }),
        TypeOrmModule.forFeature([CitizenReport, CitizenReportAiAnalysis]),
      ],
      providers: [
        ReportsService,
        {
          provide: GeminiService,
          useValue: mockGeminiService,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    reportRepository = module.get(getRepositoryToken(CitizenReport));
    aiRepository = module.get(getRepositoryToken(CitizenReportAiAnalysis));

    jest.clearAllMocks();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should persist report in database even if AI fails', async () => {
    mockGeminiService.analyzeReport.mockRejectedValue(new Error('IA falhou'));

    const dto = {
      title: 'Buraco',
      description: 'Grande buraco',
      location: 'Centro',
    };

    const result = await service.create(dto as any);

    const reports = await reportRepository.find();

    expect(reports.length).toBe(1);
    expect(reports[0].title).toBe('Buraco');

    const analyses = await aiRepository.find();
    expect(analyses.length).toBe(0);

    expect(result.id).toBeDefined();
  });

  it('should persist report and AI analysis when AI succeeds', async () => {
    mockGeminiService.analyzeReport.mockResolvedValue({
      categoria: 'Via Pública',
      prioridade: 'Média',
      resumo_tecnico: 'Resumo técnico',
    });

    const dto = {
      title: 'Buraco',
      description: 'Grande buraco',
      location: 'Centro',
    };

    const result = await service.create(dto as any);

    const reports = await reportRepository.find();
    const analyses = await aiRepository.find({
      relations: ['report'],
    });

    expect(reports.length).toBe(1);
    expect(analyses.length).toBe(1);

    expect(analyses[0].category).toBe('Via Pública');
    expect(analyses[0].report.id).toBe(result.id);
  });
});
