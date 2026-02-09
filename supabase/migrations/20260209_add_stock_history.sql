-- Migration: Add Stock History Table
-- Created: 2026-02-09
-- Description: Track all stock movements (sales, cancellations, manual adjustments)

-- Create stock_history table
CREATE TABLE IF NOT EXISTS stock_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_variant_id UUID REFERENCES product_variants(id) ON DELETE CASCADE NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  quantity_change INTEGER NOT NULL,
  previous_quantity INTEGER NOT NULL,
  new_quantity INTEGER NOT NULL,
  reason VARCHAR(50) NOT NULL CHECK (reason IN ('order_created', 'order_cancelled', 'manual_adjustment', 'stock_correction')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_stock_history_variant ON stock_history(product_variant_id);
CREATE INDEX idx_stock_history_order ON stock_history(order_id);
CREATE INDEX idx_stock_history_created_at ON stock_history(created_at DESC);

-- Add RLS policies
ALTER TABLE stock_history ENABLE ROW LEVEL SECURITY;

-- Allow public to read stock history (for transparency)
CREATE POLICY "Allow public read access to stock_history"
  ON stock_history
  FOR SELECT
  USING (true);

-- Only authenticated users can insert stock history
CREATE POLICY "Allow authenticated insert to stock_history"
  ON stock_history
  FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

-- Add comment
COMMENT ON TABLE stock_history IS 'Tracks all stock movements for product variants';
COMMENT ON COLUMN stock_history.reason IS 'Reason for stock change: order_created, order_cancelled, manual_adjustment, stock_correction';

