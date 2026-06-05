import { redirectUserByRole } from '@/lib/auth/permissions';

export default async function DashboardRedirectPage() {
  await redirectUserByRole();
  return null; // The redirectUserByRole function will handle the actual redirection
}
