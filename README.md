# 🧼 Delivery API — Clean Architecture with Node.js & TypeScript

Welcome to my Delivery API project! This project is structured based on Uncle Bob's Clean Architecture principles, aiming for high maintainability, testability, and separation of concerns.

## 🔧 Technologies

- Node.js
- TypeScript
- ExpressJS
- Jest (test framework)
- MongoDB
- Husky (run tests before commits)
- Docker (containerization)
- Git Hub Actions (CI/CD)
- Render (deployment)

## 📋 Prerequisites

Before running this project, make sure you have one of the following options set up:

- 🐳 **[Docker](https://www.docker.com/)** – Recommended. Node.js is already included inside the container.
- 🧑‍💻 **[Node.js](https://nodejs.org/)** – Only needed if you're running the app _without Docker_.

## 🚧 Work in Progress

Currently implemented features:

ATENTION! Because of a recent refactoring some features are not available 🚫️ temporarily

- ✅ **Customer routes**

### 📘 Customer Routes

These are the available endpoints for interacting with the Customer resource in the API:

**➕ Register a new customer**

POST /app/customers

Example request body:

```json
{
  "firstName": "Marcos",
  "lastName": "Martins",
  "email": "marcos@bugmail.com",
  "cpf": "15888747425",
  "phone": "21555777777",
  "role": "customer",
  "password": "Ga8485**549",
  "address": {
    "street": "test street",
    "city": "Belford Roxo",
    "state": "Rio de Janeiro",
    "zipCode": "22222220"
  }
}
```

**🔄 Update a customer by ID** 🚫️

PUT /app/customers/:id

Example request body (all fields are optional):

```json
{
  "customername": "Ash K.",
  "email": "ashk@pallet.com"
}
```

**❌ Delete a customer** 🚫️

DELETE /app/customers/:id

No body required.

**📋 Get all customers** 🚫️

GET /app/customers

No body required.

**🔍 Get customer by ID** 🚫️

GET /app/customers/id/:id

No body required.

**🔍 Get customer by Email** 🚫️

GET /app/customers/email/:email

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

## 📌 Goals

- Apply Clean Architecture for separation of concerns

- Keep business logic independent from frameworks and databases

- Write maintainable and testable code

## 📂 Future Plans

- Implement authentication
- Deploy the API

## 🧬 Entities

- Customer
- Admin
- Driver
- Restaurant Admin
- Restaurant
- Payment
- Order
- Dish
- Delivery
