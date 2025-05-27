# 🧼 Clean Architecture Delivery API

Welcome to my Delivery API project! This project is structured based on Uncle Bob's Clean Architecture principles, aiming for high maintainability, testability, and separation of concerns.


## 🚧 Work in Progress

Currently implemented features:
- ✅ **User routes** (core domain models)


### 📘 User Routes

These are the available endpoints for interacting with the User resource in the API:

**➕ Register a new user**

POST /users

Example request body:

```json
Edit
{
  "username": "Marcos",
  "email": "marcos@bugmail.com",
  "cpf": "15888747425",
  "phone": "21555777777",
  "role": "admin",
  "address": {
    "street": "test streed",
    "city": "Belford Roxo",
    "state": "Rio de Janeiro",
    "zipCode": "22222220"
  },
  "authentication": {
    "password": "Ga8485**549"
  }
}

```
**🔄 Update a user by ID**

PUT /users/:id

Example request body:

```json
Copy
Edit
{
  "name": "Ash K.",
  "email": "ashk@pallet.com"
}
```

**❌ Delete a user**

DELETE /users/:id

Example request body:

```json
Copy
Edit
{
  "email": "ash@pallet.com"
}
```

**📋 Get all users**

GET /users

No body required.

**🔍 Get user by ID**

GET /users/id/:id

No body required.

**🔍 Get user by Email**

GET /users/email/:email

No body required.
  

## 🧪 Testing

The project includes **Spy Repositories** to allow easy unit testing without real database dependencies.

```bash
npm run test
```

## 🔧 Technologies
- Node.js
- TypeScript
- ExpressJS
- Jest (test framework)
- MongoDB
- Husky (run tests before commits)


## 📌 Goals
- Apply Clean Architecture for separation of concerns

- Keep business logic independent from frameworks and databases

- Write maintainable and testable code

## 📂 Future Plans
- Use Docker for containerization
- Implement authentication
- Deploy the API


## Entities
- User (admin, client, restaurant_owner, driver)
- Restaurant
- Restaurant Chain
- Payment
- Order
- Dish
- Delivery