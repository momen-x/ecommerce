export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userImageUrl: string;
  userImagePublicId: string | null;
  email: string;
  isAdmin: boolean;
  emailVerified: boolean;
  emailVerificationToken: string | null;
  emailVerificationExpires: string | null;
  passwordResetToken: string | null;
  passwordResetExpires: string | null;
  createdAt: string;
  updatedAt: string;
}
