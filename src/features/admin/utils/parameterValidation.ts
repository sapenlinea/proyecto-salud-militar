/**
 * Reglas de validación para parámetros del sistema.
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

const NUMERIC_RANGES: Record<string, { min: number; max: number; label: string }> = {
  dias_vencimiento_farmacia: { min: 1, max: 365, label: 'Días de vencimiento' },
  max_citas_por_dia: { min: 1, max: 100, label: 'Máximo de citas por día' },
};

const NIT_REGEX = /^[0-9]{9,10}(-[0-9])?$/;

export function validateParameter(key: string, value: string): ValidationResult {
  const trimmed = value.trim();

  if (!trimmed) {
    return { valid: false, error: 'El valor no puede estar vacío.' };
  }

  const numericRule = NUMERIC_RANGES[key];
  if (numericRule) {
    const num = Number.parseInt(trimmed, 10);
    if (Number.isNaN(num)) {
      return { valid: false, error: `${numericRule.label} debe ser un número.` };
    }
    if (num < numericRule.min || num > numericRule.max) {
      return { valid: false, error: `${numericRule.label} debe estar entre ${numericRule.min} y ${numericRule.max}.` };
    }
    return { valid: true };
  }

  if (key === 'nit') {
    const normalized = trimmed.replace(/\s/g, '');
    if (!NIT_REGEX.test(normalized)) {
      return { valid: false, error: 'El NIT debe tener formato válido (ej: 900123456-7).' };
    }
    return { valid: true };
  }

  if (key === 'nombre_institucion') {
    if (trimmed.length < 3) {
      return { valid: false, error: 'El nombre debe tener al menos 3 caracteres.' };
    }
    if (trimmed.length > 200) {
      return { valid: false, error: 'El nombre no puede exceder 200 caracteres.' };
    }
    return { valid: true };
  }

  return { valid: true };
}
