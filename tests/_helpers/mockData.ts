import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { UserProps } from '../../src/domain/entities/user-props';
import { RestaurantChainProps } from '../../src/domain/entities/restaurant-chain-props';
import { RestaurantProps } from '../../src/domain/entities/restaurant-props';
import { DishProps } from '../../src/domain/entities/dish-props';
import { PaymentProps } from '../../src/domain/entities/payment-props';
import { OrderProps } from '../../src/domain/entities/order-props';
import { DeliveryProps } from '../../src/domain/entities/delivery-props';
import { mongoHelper } from '../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { DeliveryStatus, OrderStatus, PaymentMethod, UserRole } from '../../src/domain/entities/validation/_enums';

export class MockData {

  static generateHexId(): string {
    return uuidv4().replace(/-/g, "").slice(0, 24);
  }

  static mockUser(): UserProps {

    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      username: faker.person.firstName(),
      email: faker.internet.email(),
      cpf: faker.string.numeric({length: 11}),
      phone: faker.string.numeric({length: 11}),
      role: faker.helpers.enumValue(UserRole),
      address: {
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('########')
      },
      authentication: {
        //password: faker.internet.password({length: 8})
        password: 'Senh4**Corret4'
      },
    }
  }

  static mockRestaurantChain(): RestaurantChainProps {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      name: faker.company.name(),
      cnpj: faker.string.numeric({length: 11}),
      iconUrl: faker.image.url(),
      adminId: this.generateHexId(),
    };
  }

  static mockRestaurant(): RestaurantProps {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      restaurantChainId: this.generateHexId(),
      adminId: this.generateHexId(),
      isOpen: faker.helpers.arrayElement([true, false]),
      imageUrl: faker.image.url(),
      phone: faker.string.numeric({length: 11}),
      address: {
        street: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        zipCode: faker.location.zipCode('########')
      },
    };
  }

  static mockDish(): DishProps {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      name: faker.food.dish(),
      description: faker.food.description(),
      price: faker.helpers.arrayElement([40.5, 38, 11,55, 87, 120.99]),
      restaurantId: this.generateHexId(),
      imageUrl: faker.image.url(),
    };
  }

  static mockPayment(): PaymentProps {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      orderId: this.generateHexId(),
      paymentMethod: faker.helpers.enumValue(PaymentMethod),
      status: faker.helpers.arrayElement(['paid', 'pending', 'failed']),
    };
  }

  static mockOrder(): OrderProps {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      customerId: this.generateHexId(),
      restaurantId: this.generateHexId(),
      dishes: [
        {
          name: faker.food.dish(),
          description: faker.food.description(),
          price: faker.helpers.arrayElement([40.5, 38, 11,55, 87, 120.99]),
          imageUrl: faker.image.url(),
        },
        {
          name: faker.food.dish(),
          description: faker.food.description(),
          price: faker.helpers.arrayElement([40.5, 38, 11,55, 87, 120.99]),
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
  }

    static mockDelivery(): DeliveryProps {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      orderId: this.generateHexId(),
      driverId: this.generateHexId(),
      status: faker.helpers.enumValue(DeliveryStatus),
      timeEstimate: faker.helpers.arrayElement([60, 30, 20])
    };
  }
}