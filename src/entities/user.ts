enum UserRole {
  admin = 'admin',
  customer ='customer',
  restaurant = 'restaurant', 
  owner = 'owner',
  driver = 'driver'
}

interface UserAddress {
  street: string,
  city: string,
  state: string,
  zipCode: string
}

interface Authentication {
  password: string,
  salt: { type: String, select: false },
  sesstionToken: { type: String, select: false }
}

export interface User {
  username: string,
  email: string,
  cpf: string,
  phone: string,
  role: UserRole,
  address: UserAddress,
  authentication: Authentication
}