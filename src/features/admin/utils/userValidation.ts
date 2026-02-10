/**
 * Reglas de validación para usuarios.
 */

export interface UserValidationResult {
  valid: boolean;
  error?: string;
}

const USERNAME_REGEX = /^[a-zA-Z0-9._*-]{3,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface UserFormData {
  username: string;
  email: string;
  displayName: string;
  roles: string[];
}

export function validateUser(
  data: UserFormData,
  existingUsernames: string[],
  excludeUsername?: string
): UserValidationResult {
  const username = data.username.trim();
  const email = data.email.trim();
  const displayName = data.displayName.trim();

  if (!username) {
    return { valid: false, error: 'El usuario es obligatorio.' };
  }
  if (!USERNAME_REGEX.test(username)) {
    return { valid: false, error: 'El usuario debe tener entre 3 y 50 caracteres (letras, números, ., _, -, *).' };
  }
  const usernameLower = username.toLowerCase();
  const isDuplicate = existingUsernames.some(
    (u) => u.toLowerCase() === usernameLower && u.toLowerCase() !== excludeUsername?.toLowerCase()
  );
  if (isDuplicate) {
    return { valid: false, error: 'Ya existe un usuario con ese nombre.' };
  }

  if (!email) {
    return { valid: false, error: 'El email es obligatorio.' };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'El email no tiene un formato válido.' };
  }

  if (!displayName) {
    return { valid: false, error: 'El nombre de pantalla es obligatorio.' };
  }
  if (displayName.length > 100) {
    return { valid: false, error: 'El nombre no puede exceder 100 caracteres.' };
  }

  if (!data.roles.length) {
    return { valid: false, error: 'Debe asignar al menos un rol.' };
  }

  return { valid: true };
}
