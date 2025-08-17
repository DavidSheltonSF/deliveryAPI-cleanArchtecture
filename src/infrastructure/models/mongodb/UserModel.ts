export interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  birthday: Date;
  passwordHash: string
  createdAt: Date;
}
