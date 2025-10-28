export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  passwordHash: string
  createdAt: Date;
}
