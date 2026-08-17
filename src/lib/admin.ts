/**
 * Lista de e-mails que têm acesso de administrador.
 * Troque pelo(s) e-mail(s) que você usa pra testar como admin.
 *
 * Quando o backend passar a mandar um campo "role"/"tipo" no login,
 * é só trocar a função isAdmin para checar esse campo em vez do e-mail.
 */
export const ADMIN_EMAILS = ['admin@delivery.com'];

export function isAdmin(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}