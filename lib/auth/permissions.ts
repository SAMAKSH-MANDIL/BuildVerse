import { auth, currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { UserRole, UserStatus } from './roles';
import prisma from '@/lib/prisma';

export async function getCurrentClerkUser() {
  const user = await currentUser();
  return user;
}

export async function getCurrentUserRole(): Promise<UserRole | null> {
  const user = await currentUser();
  if (!user) return null;
  
  const dbUser = await prisma.platformUser.findUnique({
    where: { clerkUserId: user.id },
    select: { role: true }
  });
  
  if (dbUser?.role) return dbUser.role as UserRole;
  
  const role = user.publicMetadata.role as string;
  if (!role) return UserRole.PENDING;
  
  if (Object.values(UserRole).includes(role as UserRole)) {
    return role as UserRole;
  }
  
  return null;
}

export async function checkUserStatus(): Promise<UserStatus | null> {
  const user = await currentUser();
  if (!user) return null;
  
  const dbUser = await prisma.platformUser.findUnique({
    where: { clerkUserId: user.id },
    select: { status: true }
  });
  
  if (dbUser?.status) return dbUser.status as UserStatus;
  
  const status = user.publicMetadata.status as string;
  if (!status) return UserStatus.PENDING_APPROVAL;
  
  if (Object.values(UserStatus).includes(status as UserStatus)) {
    return status as UserStatus;
  }
  
  return null;
}

export async function requireAuthenticatedUser() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
  
  const dbUser = await prisma.platformUser.findUnique({
    where: { clerkUserId: user.id }
  });
  
  return dbUser || user; // Return db user if it exists so we have access to evaluatorProfileId
}

export async function checkBaseAccess() {
  const user = await requireAuthenticatedUser();
  const status = await checkUserStatus();
  
  if (status === UserStatus.SUSPENDED) {
    redirect('/unauthorized');
  }
  
  if (status === UserStatus.PENDING_APPROVAL || status === UserStatus.INACTIVE) {
    redirect('/pending-approval');
  }
  
  return user;
}

export async function requireSuperAdmin() {
  const user = await checkBaseAccess();
  const role = await getCurrentUserRole();
  
  if (role !== UserRole.SUPER_ADMIN) {
    redirect('/unauthorized');
  }
  return user;
}

export async function requireAdminOrSuperAdmin() {
  await checkBaseAccess();
  const role = await getCurrentUserRole();
  
  if (role !== UserRole.SUPER_ADMIN && role !== UserRole.ADMIN) {
    redirect('/unauthorized');
  }
}

export async function requireEvaluator() {
  const user = await checkBaseAccess();
  const role = await getCurrentUserRole();
  
  if (role !== UserRole.EVALUATOR && role !== UserRole.SUPER_ADMIN) {
    redirect('/unauthorized');
  }
  return user as any; // Returns either PlatformUser from DB or Clerk user
}

export async function redirectUserByRole() {
  const user = await currentUser();
  if (!user) {
    redirect('/sign-in');
  }
  
  const status = await checkUserStatus();
  if (status === UserStatus.SUSPENDED) {
    redirect('/unauthorized');
  }
  if (status === UserStatus.PENDING_APPROVAL || status === UserStatus.INACTIVE) {
    redirect('/pending-approval');
  }
  
  const role = await getCurrentUserRole();
  
  switch (role) {
    case UserRole.SUPER_ADMIN:
      redirect('/super-admin/dashboard');
    case UserRole.ADMIN:
      redirect('/admin/dashboard');
    case UserRole.EVALUATOR:
      redirect('/evaluator/dashboard');
    default:
      redirect('/pending-approval');
  }
}
