

export type ProductInfo = {
  productId: string;
  selectedQuantity: number;
  image: string;
  price: number;
  name:string,
  discount:number,
  size:string
};

export type OrderType = {
  buyerName: string;
  buyerEmail: string;
  address: string;
  mobile: number;
  additionalInfo: string;
  totalPrice: number;
  paymentSystem: string;
  orderNumber: string;
  orderDate: string;
  deliveryStatus?: string;
  orderProduct?: ProductInfo[];
};
