import { Injectable, Logger } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
  private readonly ai: GoogleGenAI;
  private readonly logger = new Logger(GeminiService.name);

  constructor() {
    this.ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY!,
    });
  }

  async analyzeReport(data: {
    title: string;
    description: string;
    location: string;
  }) {
    const prompt = `
Você é um assistente técnico da administração pública.

Analise o seguinte relato de cidadão e retorne EXCLUSIVAMENTE um JSON válido com a seguinte estrutura:

{
  "categoria": "Iluminação | Via Pública | Saneamento | Outros",
  "prioridade": "Baixa | Média | Alta",
  "resumo_tecnico": "Texto formal, impessoal e objetivo."
}

Relato:
Título: ${data.title}
Descrição: ${data.description}
Localização: ${data.location}

Regras:
- Classifique a categoria de forma coerente.
- Defina prioridade com base em risco à segurança.
- O resumo deve ser técnico e formal.
- NÃO retorne texto fora do JSON.
`;

    const response = await this.ai.models.generateContent({
      model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    });

    const text = response.text ?? '';

    this.logger.debug(`Resposta texto IA: ${text}`);

    const cleaned = text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    try {
      return cleaned.trim().startsWith('{')
        ? JSON.parse(cleaned)
        : JSON.parse(cleaned.substring(cleaned.indexOf('{')));
    } catch {
      throw new Error('Resposta da IA não está em JSON válido.');
    }
  }
}
