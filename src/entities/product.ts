export interface Product {
  name: string,
  description: string,
  price: number,
  restaurantId: string,
  imageUrl?: string,
}

export class ProductCast {
  /* Converts database documents into Product type objects */
  static toProduct (data: Record<string, any>): Product {
    const {
        name,
        description,
        price,
        restaurantId,
        imageUrl,
    } = data;

    return {
      name,
      description,
      price,
      restaurantId,
      imageUrl,
    }
  }
}