# 🧼 Clean Architecture Delivery API

Welcome to my Delivery API project! This project is structured based on Uncle Bob's Clean Architecture principles, aiming for high maintainability, testability, and separation of concerns.


## 🚧 Work in Progress

Currently implemented:
- ✅ **Entities** (core domain models)
- ✅ **Repositories** (interfaces)
- ✅ **Spy Repositories** (for testing/mocking)

In progress:
- 👨‍💻️ **Use Cases** (application logic)
  
To be implemented:
- 🛠️ **Controllers**
- 🛠️ **Routes**

## 🧪 Testing

The project includes **Spy Repositories** to allow easy unit testing without real database dependencies.

```bash
npm run test
```

## 🔧 Technologies
- Node.js
- TypeScript
- Jest (test framework)
- MongoDB
- Husky (run tests before commits)


## 📌 Goals
- Apply Clean Architecture for separation of concerns

- Keep business logic independent from frameworks and databases

- Write maintainable and testable code

## 📂 Future Plans
- Add Express.js
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