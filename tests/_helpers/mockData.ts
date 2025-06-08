import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { UserProps } from '../../src/domain/entities/user-props';
import { RestaurantChainProps } from '../../src/domain/entities/restaurant-chain-props';
import { RestaurantProps } from '../../src/domain/entities/restaurant-props';
import { DishProps } from '../../src/domain/entities/dish-props';
import { PaymentProps } from '../../src/domain/entities/payment-props';
import { OrderProps } from '../../src/domain/entities/order-props';
import { DeliveryProps } from '../../src/domain/entities/delivery-props';
import { DeliveryStatus, OrderStatus, PaymentMethod, UserRole } from '../../src/domain/entities/validation/_enums';

export class MockData {

  static generateHexId(): string {
    return uuidv4().replace(/-/g, "").slice(0, 24);
  }

  static mockUser(count: number = 1): UserProps[] {
    const mockedUsers: UserProps[] = [];
    for (let i = 0; i < count; i++) {
      const user = {
        id: this.generateHexId(),
        username: faker.person.firstName(),
        email: faker.internet.email(),
        cpf: faker.string.numeric({ length: 11 }),
        phone: faker.string.numeric({ length: 11 }),
        role: faker.helpers.enumValue(UserRole),
        address: {
          street: faker.location.street(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode('########')
        },
        authentication: {
          password: 'Senh4**Corret4'
        },
      };
      mockedUsers.push(user);
    }
    return mockedUsers;
  }

  static mockRestaurantChain(count: number = 1): RestaurantChainProps[] {
    const mockedChains: RestaurantChainProps[] = [];
    for (let i = 0; i < count; i++) {
      const chain = {
        id: this.generateHexId(),
        name: faker.company.name(),
        cnpj: faker.string.numeric({ length: 11 }),
        iconUrl: faker.image.url(),
        adminId: this.generateHexId(),
      };
      mockedChains.push(chain);
    }
    return mockedChains;
  }

  static mockRestaurant(count: number = 1): RestaurantProps[] {
    const mockedRestaurants: RestaurantProps[] = [];
    for (let i = 0; i < count; i++) {
      const restaurant = {
        id: this.generateHexId(),
        restaurantChainId: this.generateHexId(),
        adminId: this.generateHexId(),
        isOpen: faker.helpers.arrayElement([true, false]),
        imageUrl: faker.image.url(),
        phone: faker.string.numeric({ length: 11 }),
        address: {
          street: faker.location.street(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode('########')
        },
      };
      mockedRestaurants.push(restaurant);
    }
    return mockedRestaurants;
  }

  static mockDish(count: number = 1): DishProps[] {
    const mockedDishes: DishProps[] = [];
    for (let i = 0; i < count; i++) {
      const dish = {
        id: this.generateHexId(),
        name: faker.food.dish(),
        description: faker.food.description(),
        price: faker.helpers.arrayElement([40.5, 38, 11, 55, 87, 120.99]),
        restaurantId: this.generateHexId(),
        imageUrl: faker.image.url(),
      };
      mockedDishes.push(dish);
    }
    return mockedDishes;
  }

  static mockPayment(count: number = 1): PaymentProps[] {
    const mockedPayments: PaymentProps[] = [];
    for (let i = 0; i < count; i++) {
      const payment = {
        id: this.generateHexId(),
        orderId: this.generateHexId(),
        paymentMethod: faker.helpers.enumValue(PaymentMethod),
        status: faker.helpers.arrayElement(['paid', 'pending', 'failed']),
      };
      mockedPayments.push(payment);
    }
    return mockedPayments;
  }

  static mockOrder(count: number = 1): OrderProps[] {
    const mockedOrders: OrderProps[] = [];
    for (let i = 0; i < count; i++) {
      const order = {
        id: this.generateHexId(),
        customerId: this.generateHexId(),
        restaurantId: this.generateHexId(),
        dishes: [
          {
            name: faker.food.dish(),
            description: faker.food.description(),
            price: faker.helpers.arrayElement([40.5, 38, 11, 55, 87, 120.99]),
            imageUrl: faker.image.url(),
          },
          {
            name: faker.food.dish(),
            description: faker.food.description(),
            price: faker.helpers.arrayElement([40.5, 38, 11, 55, 87, 120.99]),
            imageUrl: faker.image.url(),
          }
        ],
        totalPrice: faker.helpers.arrayElement([300, 200, 559.5]),
        status: faker.helpers.enumValue(OrderStatus),
        address: {
          street: faker.location.street(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode('########')
        },
      };
      mockedOrders.push(order);
    }
    return mockedOrders;
  }

  static mockDelivery(count: number = 1): DeliveryProps[] {
    const mockedDeliveries: DeliveryProps[] = [];
    for (let i = 0; i < count; i++) {
      const delivery = {
        id: this.generateHexId(),
        orderId: this.generateHexId(),
        driverId: this.generateHexId(),
        status: faker.helpers.enumValue(DeliveryStatus),
        timeEstimateInMinutes: faker.helpers.arrayElement([60, 30, 20]),
      };
      mockedDeliveries.push(delivery);
    }
    return mockedDeliveries;
  }
}