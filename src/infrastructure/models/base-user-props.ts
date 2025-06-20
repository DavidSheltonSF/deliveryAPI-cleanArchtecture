export interface BaseUserModel {
  _id: string;
  username: string;
  email: string;
  authentication: {
    passwordHash: string;
    sessionToken?: string;
  };
  createdAt: Date;
}
