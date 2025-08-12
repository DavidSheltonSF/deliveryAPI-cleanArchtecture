export interface AuthenticationModel {
  userId: string;
  passwordHash: string;
  sessionToken?: string;
  createdAt: Date;
}

export interface AuthenticationModelWithId extends AuthenticationModel {
  id: string;
}
