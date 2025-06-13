import { WithId, Document } from 'mongodb';
import { UserProps } from '../../../../domain/entities/user-props';
import { DeliveryProps } from '../../../../domain/entities/delivery-props';
import { DishProps } from '../../../../domain/entities/dish-props';
import { OrderProps } from '../../../../domain/entities/order-props';
import { PaymentProps } from '../../../../domain/entities/payment-props';
import { RestaurantChainProps } from '../../../../domain/entities/restaurant-chain-props';
import { RestaurantProps } from '../../../../domain/entities/restaurant-props';
import { mongoHelper } from './mongo-helper';

export class MongodbMapper {
  static toUser(data: WithId<Document>): UserProps {
    const id = data._id.toString();
    const {
      username,
      email,
      cpf,
      phone,
      role,
      address,
      authentication,
      bankInfo,
    } = data;

    return {
      id,
      username,
      email,
      cpf,
      phone,
      role,
      address,
      authentication,
      bankInfo,
    };
  }

  static toDelivery(data: WithId<Document>): DeliveryProps {
    const id = data._id.toString();
    const { orderId, driverId, status, timeEstimateInMinutes } = data;

    return {
      id,
      orderId,
      driverId,
      status,
      timeEstimateInMinutes,
    };
  }

  static toDish(data: WithId<Document>): DishProps {
    const id = data._id.toString();
    const { name, description, price, restaurantId, imageUrl } = data;

    return {
      id,
      name,
      description,
      price,
      restaurantId,
      imageUrl,
    };
  }

  static toOrder(data: WithId<Document>): OrderProps {
    const id = data._id.toString();
    const { customerId, restaurantId, dishes, totalPrice, status, address } =
      data;

    return {
      id,
      customerId,
      restaurantId,
      dishes,
      totalPrice,
      status,
      address,
    };
  }

  static toPayment(data: WithId<Document>): PaymentProps {
    const id = data._id.toString();
    const { orderId, paymentMethod, status } = data;

    return {
      id,
      orderId,
      paymentMethod,
      status,
    };
  }

  static toRestaurantChain(data: WithId<Document>): RestaurantChainProps {
    const id = data._id.toString();
    const { name, cnpj, iconUrl, adminId } = data;

    return {
      id,
      name,
      cnpj,
      iconUrl,
      adminId,
    };
  }

  static toRestaurant(data: WithId<Document>): RestaurantProps {
    const id = data._id.toString();
    const { restaurantChainId, adminId, isOpen, phone, imageUrl, address } =
      data;

    return {
      id,
      restaurantChainId,
      adminId,
      isOpen,
      phone,
      imageUrl,
      address,
    };
  }

  static toMongodbDocument(data: any): WithId<Document> {
    const {id, ...dataWithoutId} = data
    const _id = mongoHelper.toObjectId(id);

    return {
      _id,
      ...dataWithoutId
    }
  }
}
