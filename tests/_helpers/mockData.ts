import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { User} from '../../src/domain/entities/user';
import { RestaurantChain } from '../../src/domain/entities/restaurantChain';
import { Restaurant } from '../../src/domain/entities/restaurant';
import { Product } from '../../src/domain/entities/product';
import { Payment } from '../../src/domain/entities/payment';
import { Order } from '../../src/domain/entities/order';
import { Delivery } from '../../src/domain/entities/delivery';
import { mongoHelper } from '../../src/infrastructure/repositories/mongodb/helpers/mongo-helper';
import { DeliveryStatus, OrderStatus, PaymentMethod, UserRole } from '../../src/domain/entities/validators/_enums';


export class MockData {

  static generateHexId(): string {
    return uuidv4().replace(/-/g, "").slice(0, 24);
  }

  static mockUser(): User {

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

  static mockRestaurantChain(): RestaurantChain {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      name: faker.company.name(),
      cnpj: faker.string.numeric({length: 11}),
      iconUrl: faker.image.url(),
      adminId: this.generateHexId(),
    };
  }

  static mockRestaurant(): Restaurant {
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

  static mockProduct(): Product {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      name: faker.food.dish(),
      description: faker.food.description(),
      price: faker.helpers.arrayElement([40.5, 38, 11,55, 87, 120.99]),
      restaurantId: this.generateHexId(),
      imageUrl: faker.image.url(),
    };
  }

  static mockPayment(): Payment {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      orderId: this.generateHexId(),
      paymentMethod: faker.helpers.enumValue(PaymentMethod),
      status: faker.helpers.arrayElement(['paid', 'pending', 'failed']),
    };
  }

  static mockOrder(): Order {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      customerId: this.generateHexId(),
      restaurantId: this.generateHexId(),
      products: [
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

    static mockDelivery(): Delivery {
    return {
      _id: mongoHelper.toObjectId(this.generateHexId()),
      orderId: this.generateHexId(),
      driverId: this.generateHexId(),
      status: faker.helpers.enumValue(DeliveryStatus),
      timeEstimate: faker.helpers.arrayElement([60, 30, 20])
    };
  }
}