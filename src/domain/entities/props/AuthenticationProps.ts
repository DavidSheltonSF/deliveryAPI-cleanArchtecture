export interface AuthenticationProps {
  id?: string;
  userId: string;
  passwordHash: string;
  sessionToken?: string;
  createdAt?: Date
}
