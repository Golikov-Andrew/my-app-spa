
export interface Product {
  id: number;
  title: string;
  description: string;
  image_url: string;
  black_price?: number;
  final_price: number;
  quantity: number;
}
