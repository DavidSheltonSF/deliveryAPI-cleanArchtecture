export interface UserModel {
  username: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: string;
  birthday: Date;
  createdAt: Date;
}

export interface UserModelWithId extends UserModel {
  id: string;
}