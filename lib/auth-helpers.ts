export const SUPER_ADMIN_EMAILS = [
    'davisgreg1@gmail.com',
];

export function isSuperAdmin(email: string | null | undefined): boolean {
    if (!email) return false;
    return SUPER_ADMIN_EMAILS.includes(email);
}
