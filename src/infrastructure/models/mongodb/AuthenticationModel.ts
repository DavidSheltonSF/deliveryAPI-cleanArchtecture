export interface AuthenticationModel {
  userId: string;
  passwordHash: string;
  sessionToken?: string;
  createdAt: Date;
}
