export interface Product {
  name: string,
  description: string,
  price: number,
  productId: string,
  imageUrl?: string,
}

export class ProductCast {
  /* Converts database documents into Product type objects */
  static toProduct (data: Record<string, any>): Product {
    const {
        name,
        description,
        price,
        productId,
        imageUrl,
    } = data;

    return {
      name,
      description,
      price,
      productId,
      imageUrl,
    }
  }
}