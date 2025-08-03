export interface AuthenticationModel {
  _id: string;
  userId: string;
  passwordHash: string;
  sessionToken?: string;
  createdAt: Date;
}
