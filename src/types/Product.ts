export interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string | undefined;
  black_price?: number;
  final_price: number;
  quantity: number;
}

export interface CartItem extends Product {
  qty: number;
}

export interface OrderItem {
  product: Product;
  qty: number;
  blackPrice: number;
  finalPrice: number;
  totalCost: number;
}


