import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MinLength(5, { message: 'O título deve ter pelo menos 5 caracteres' })
  @MaxLength(100, { message: 'O título deve ter no máximo 100 caracteres' })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @MinLength(10, { message: 'Descreva com pelo menos 10 caracteres' })
  description!: string;

  @IsString()
  @IsNotEmpty({ message: 'A localização é obrigatória' })
  @MaxLength(255)
  location!: string;
}
