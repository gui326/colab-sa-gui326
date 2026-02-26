/// <reference types="jest" />

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReportsService } from './reports.service';
import { CitizenReport } from './entities/report.entity';
import { CitizenReportAiAnalysis } from './entities/reportAiAnalysis.entity';
import { GeminiService } from '../../ai/gemini.service';

describe('ReportsService', () => {
  let service: ReportsService;
  let reportRepository: Repository<CitizenReport>;
  let aiRepository: Repository<CitizenReportAiAnalysis>;
  let geminiService: GeminiService;

  const mockReportRepository = {
    save: jest.fn(),
  };

  const mockAiRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const mockGeminiService = {
    analyzeReport: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReportsService,
        {
          provide: getRepositoryToken(CitizenReport),
          useValue: mockReportRepository,
        },
        {
          provide: getRepositoryToken(CitizenReportAiAnalysis),
          useValue: mockAiRepository,
        },
        {
          provide: GeminiService,
          useValue: mockGeminiService,
        },
      ],
    }).compile();

    service = module.get<ReportsService>(ReportsService);
    reportRepository = module.get(getRepositoryToken(CitizenReport));
    aiRepository = module.get(getRepositoryToken(CitizenReportAiAnalysis));
    geminiService = module.get(GeminiService);

    jest.clearAllMocks();
  });

  it('should save report even if AI fails', async () => {
    const dto = {
      title: 'Buraco na rua',
      description: 'Grande buraco',
      location: 'Centro',
    };

    const savedReport = { id: '1', ...dto };

    mockReportRepository.save.mockResolvedValue(savedReport);
    mockGeminiService.analyzeReport.mockRejectedValue(new Error('IA falhou'));

    const result = await service.create(dto as any);

    expect(reportRepository.save).toHaveBeenCalled();
    expect(geminiService.analyzeReport).toHaveBeenCalled();
    expect(aiRepository.save).not.toHaveBeenCalled();
    expect(result).toEqual(savedReport);
  });

  it('should save AI analysis when AI succeeds', async () => {
    const dto = {
      title: 'Buraco na rua',
      description: 'Grande buraco',
      location: 'Centro',
    };

    const savedReport = { id: '1', ...dto };

    const aiResponse = {
      categoria: 'Via Pública',
      prioridade: 'Média',
      resumo_tecnico: 'Resumo técnico',
    };

    mockReportRepository.save.mockResolvedValue(savedReport);
    mockGeminiService.analyzeReport.mockResolvedValue(aiResponse);
    mockAiRepository.create.mockReturnValue(aiResponse);
    mockAiRepository.save.mockResolvedValue(aiResponse);

    const result = await service.create(dto as any);

    expect(reportRepository.save).toHaveBeenCalled();
    expect(geminiService.analyzeReport).toHaveBeenCalled();
    expect(aiRepository.create).toHaveBeenCalled();
    expect(aiRepository.save).toHaveBeenCalled();
    expect(result).toEqual(savedReport);
  });
});
