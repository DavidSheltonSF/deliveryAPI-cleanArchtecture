# 🧼 Clean Architecture Delivery API

testing

Welcome to my Delivery API project! This project is structured based on Uncle Bob's Clean Architecture principles, aiming for high maintainability, testability, and separation of concerns.

## 📋 Prerequisites

Before running this project, make sure you have one of the following options set up:

- 🐳 **[Docker](https://www.docker.com/)** – Recommended. Node.js is already included inside the container.
- 🧑‍💻 **[Node.js](https://nodejs.org/)** – Only needed if you're running the app *without Docker*.

## 🚧 Work in Progress

Currently implemented features:
- ✅ **User routes** 


### 📘 User Routes

These are the available endpoints for interacting with the User resource in the API:

**➕ Register a new user**

POST /app/users

Example request body:

```json
{
  "username": "Marcos",
  "email": "marcos@bugmail.com",
  "cpf": "15888747425",
  "phone": "21555777777",
  "role": "admin",
  "address": {
    "street": "test street",
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

PUT /app/users/:id

Example request body (all fields are optional):

```json
{
  "username": "Ash K.",
  "email": "ashk@pallet.com"
}
```

**❌ Delete a user**

DELETE /app/users/:id

No body required.

**📋 Get all users**

GET /app/users

No body required.

**🔍 Get user by ID**

GET /app/users/id/:id

No body required.

**🔍 Get user by Email**

GET /app/users/email/:email

No body required.

## 📦 Installation
```bash
git clone https://github.com/DavidSheltonSF/deliveryAPI-cleanArchtecture
cd deliveryAPI-cleanArchtecture
npm install
npm run dev
```

## 🐳 Running the app with Docker

You can run the app with the following commands

```bash
docker build -t delivery-app .
docker run --env-file .env -p 3000:3000 delivery-app
```

Make sure your .env file is configured like the example below:

```bash
# .env example
MONGO_URI=valid_mongodb_connection_string
```

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
- Docker (containerization)


## 📌 Goals
- Apply Clean Architecture for separation of concerns

- Keep business logic independent from frameworks and databases

- Write maintainable and testable code

## 📂 Future Plans
- Implement authentication
- Deploy the API


## 🧬 Entities
- User (admin, client, restaurant_owner, driver)
- Restaurant
- Restaurant Chain
- Payment
- Order
- Dish
- Delivery