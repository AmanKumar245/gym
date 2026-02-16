/*
  # E-commerce Database Schema for Gym Wrist Bands

  ## Overview
  Creates tables for a gym wrist band e-commerce website with product management,
  cart functionality, order tracking, and analytics.

  ## New Tables
  
  ### `products`
  Stores gym wrist band product information
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `description` (text) - Product description
  - `price` (decimal) - Product price
  - `image_url` (text) - Product image URL
  - `stock` (integer) - Available stock quantity
  - `created_at` (timestamptz) - Record creation timestamp

  ### `orders`
  Stores customer orders
  - `id` (uuid, primary key) - Unique order identifier
  - `customer_name` (text) - Customer name
  - `customer_email` (text) - Customer email
  - `customer_address` (text) - Delivery address
  - `total_amount` (decimal) - Total order amount
  - `status` (text) - Order status
  - `created_at` (timestamptz) - Order creation timestamp

  ### `order_items`
  Stores individual items within orders
  - `id` (uuid, primary key) - Unique item identifier
  - `order_id` (uuid, foreign key) - Reference to orders table
  - `product_id` (uuid, foreign key) - Reference to products table
  - `quantity` (integer) - Item quantity
  - `price` (decimal) - Price at time of purchase
  - `created_at` (timestamptz) - Record creation timestamp

  ### `analytics`
  Tracks API calls and page visits for analytics
  - `id` (uuid, primary key) - Unique analytics record identifier
  - `event_type` (text) - Type of event (page_view, add_to_cart, checkout, etc.)
  - `event_data` (jsonb) - Additional event data
  - `created_at` (timestamptz) - Event timestamp

  ## Security
  - Enable RLS on all tables
  - Public read access for products
  - Public insert access for orders, order_items, and analytics
  - No update/delete access to maintain data integrity
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price decimal(10,2) NOT NULL,
  image_url text NOT NULL,
  stock integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_address text NOT NULL,
  total_amount decimal(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL,
  price decimal(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type text NOT NULL,
  event_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Products policies: Public read access
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon
  USING (true);

-- Orders policies: Public insert access
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view their orders"
  ON orders FOR SELECT
  TO anon
  USING (true);

-- Order items policies: Public insert access
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view order items"
  ON order_items FOR SELECT
  TO anon
  USING (true);

-- Analytics policies: Public insert and read access
CREATE POLICY "Anyone can insert analytics"
  ON analytics FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can view analytics"
  ON analytics FOR SELECT
  TO anon
  USING (true);

-- Insert sample products
INSERT INTO products (name, description, price, image_url, stock) VALUES
  ('Pro Grip Wrist Band', 'Premium cotton wrist band with superior grip and sweat absorption. Perfect for intense workouts.', 12.99, 'https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=800', 100),
  ('Elite Performance Band', 'High-performance wrist band designed for professional athletes. Breathable and durable.', 15.99, 'https://images.pexels.com/photos/4164761/pexels-photo-4164761.jpeg?auto=compress&cs=tinysrgb&w=800', 75),
  ('Classic Gym Band', 'Traditional gym wrist band with excellent moisture control. Great for everyday training.', 9.99, 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800', 150);
