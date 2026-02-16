export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  created_at: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id?: string;
  customer_name: string;
  customer_email: string;
  customer_address: string;
  total_amount: number;
  status?: string;
  created_at?: string;
}

export interface OrderItem {
  order_id: string;
  product_id: string;
  quantity: number;
  price: number;
}
