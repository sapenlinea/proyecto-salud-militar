/**
 * Reglas de validación para catálogos maestros.
 */

export interface CatalogValidationResult {
  valid: boolean;
  error?: string;
}

export function validateCatalogItem(
  code: string,
  name: string,
  existingCodes: string[],
  excludeCode?: string
): CatalogValidationResult {
  const trimmedCode = code.trim().toUpperCase();
  const trimmedName = name.trim();

  if (!trimmedCode) {
    return { valid: false, error: 'El código es obligatorio.' };
  }

  if (trimmedCode.length > 20) {
    return { valid: false, error: 'El código no puede exceder 20 caracteres.' };
  }

  if (!trimmedName) {
    return { valid: false, error: 'El nombre es obligatorio.' };
  }

  if (trimmedName.length > 100) {
    return { valid: false, error: 'El nombre no puede exceder 100 caracteres.' };
  }

  const excludeUpper = excludeCode?.trim().toUpperCase();
  const isDuplicate = existingCodes.some((c) => {
    const cUpper = c.trim().toUpperCase();
    return cUpper === trimmedCode && cUpper !== excludeUpper;
  });
  if (isDuplicate) {
    return { valid: false, error: 'Ya existe un ítem con ese código en el catálogo.' };
  }

  return { valid: true };
}
