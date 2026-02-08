-- Row Level Security Policies
-- Execute após criar o schema

-- Enable RLS on all tables
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses ENABLE ROW LEVEL SECURITY;

-- Categories Policies
-- Public can read active categories
CREATE POLICY "Public can view active categories"
  ON categories FOR SELECT
  USING (is_active = true);

-- Admin can do everything (you'll need to create an admin role)
CREATE POLICY "Admin full access to categories"
  ON categories FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Products Policies
-- Public can read active products
CREATE POLICY "Public can view active products"
  ON products FOR SELECT
  USING (is_active = true);

-- Admin full access
CREATE POLICY "Admin full access to products"
  ON products FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Product Images Policies
-- Public can view images of active products
CREATE POLICY "Public can view product images"
  ON product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_images.product_id
      AND products.is_active = true
    )
  );

-- Admin full access
CREATE POLICY "Admin full access to product images"
  ON product_images FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Product Variants Policies
-- Public can view active variants of active products
CREATE POLICY "Public can view active product variants"
  ON product_variants FOR SELECT
  USING (
    is_active = true AND
    EXISTS (
      SELECT 1 FROM products
      WHERE products.id = product_variants.product_id
      AND products.is_active = true
    )
  );

-- Admin full access
CREATE POLICY "Admin full access to product variants"
  ON product_variants FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- Orders Policies
-- Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create orders (guest checkout)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Admin can view all orders
CREATE POLICY "Admin can view all orders"
  ON orders FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- Admin can update orders
CREATE POLICY "Admin can update orders"
  ON orders FOR UPDATE
  USING (auth.jwt() ->> 'role' = 'admin');

-- Order Items Policies
-- Users can view items from their orders
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Anyone can insert order items (during checkout)
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

-- Admin can view all order items
CREATE POLICY "Admin can view all order items"
  ON order_items FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

-- Coupons Policies
-- Public can read active coupons (for validation)
CREATE POLICY "Public can view active coupons"
  ON coupons FOR SELECT
  USING (
    is_active = true AND
    valid_from <= NOW() AND
    valid_until >= NOW()
  );

-- Admin full access
CREATE POLICY "Admin full access to coupons"
  ON coupons FOR ALL
  USING (auth.jwt() ->> 'role' = 'admin');

-- User Addresses Policies
-- Users can manage their own addresses
CREATE POLICY "Users can view own addresses"
  ON user_addresses FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses"
  ON user_addresses FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses"
  ON user_addresses FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses"
  ON user_addresses FOR DELETE
  USING (auth.uid() = user_id);

-- Admin can view all addresses
CREATE POLICY "Admin can view all addresses"
  ON user_addresses FOR SELECT
  USING (auth.jwt() ->> 'role' = 'admin');

