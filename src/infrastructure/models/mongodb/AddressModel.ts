export interface AddressModel {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  userId: string;
  createdAt: Date;
}

export interface AddressModelWithId extends AddressModel {
  id: string;
}