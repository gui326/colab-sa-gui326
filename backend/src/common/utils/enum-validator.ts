export function validateEnum<T>(enumType: T, value: any): T[keyof T] {
  if (Object.values(enumType as any).includes(value)) {
    return value;
  }

  throw new Error(`Valor inválido para enum: ${value}`);
}
