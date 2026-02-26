import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ReportsService } from './reports.service';
import { CitizenReport } from './entities/citizen-report.entity';
import { CitizenReportAiAnalysis } from './entities/citizen-report-ai-analysis.entity';
import { GeminiService } from '../ai/gemini.service';

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