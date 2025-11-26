import type { OrderItem } from "./Product";


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
