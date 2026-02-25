import { z } from "zod";

export const reportSchema = z.object({
  title: z
    .string()
    .min(5, "O título deve ter pelo menos 5 caracteres")
    .max(100, "O título deve ter no máximo 100 caracteres"),

  description: z.string().min(10, "Descreva com pelo menos 10 caracteres"),

  location: z.string().min(1, "A localização é obrigatória"),
});

export type ReportFormData = z.infer<typeof reportSchema>;
