export interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string | undefined;
  black_price?: number;
  final_price: number;
  quantity: number;
}

export interface CartItem {
  id: number;
  title: string;
  description: string;
  image_url: string | undefined;
  black_price?: number;
  final_price: number;
  quantity: number;
  qty: number;
}

export interface OrderItem {
  product: Product;
  qty: number;
  blackPrice: number;
  finalPrice: number;
  totalCost: number;
}

export interface Order {
  id: number;
  orderStatus: string;
  deliveryStatus: string;
  deliveryAddress: string;
  deliveryContact: string;
  deliveryName: string;
  deliveryComment: string;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  isOrderPaid: boolean;
  orderItems: OrderItem[];
}
