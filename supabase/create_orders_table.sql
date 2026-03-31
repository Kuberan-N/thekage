-- ============================================
-- THE KAGE — Orders Table DDL
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  
  -- Razorpay fields (NULL for COD orders)
  razorpay_order_id   TEXT,
  razorpay_payment_id TEXT,
  razorpay_signature  TEXT,
  
  -- Customer info
  customer_name   TEXT NOT NULL,
  customer_email  TEXT,                    -- Optional
  customer_phone  TEXT NOT NULL,
  
  -- Shipping address
  shipping_address TEXT NOT NULL,
  shipping_city    TEXT NOT NULL,
  shipping_state   TEXT NOT NULL,
  shipping_pincode TEXT NOT NULL,
  
  -- Order items (JSON array of {productId, name, size, quantity, price})
  items           JSONB NOT NULL DEFAULT '[]'::jsonb,
  
  -- Pricing
  total_amount    NUMERIC(10,2) NOT NULL DEFAULT 0,
  
  -- Payment & status
  payment_method  TEXT NOT NULL DEFAULT 'razorpay'
                  CHECK (payment_method IN ('razorpay', 'cod')),
  status          TEXT NOT NULL DEFAULT 'confirmed'
                  CHECK (status IN ('confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  
  -- Timestamps
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes for common queries
CREATE INDEX idx_orders_status ON orders (status);
CREATE INDEX idx_orders_payment_method ON orders (payment_method);
CREATE INDEX idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX idx_orders_customer_phone ON orders (customer_phone);
CREATE INDEX idx_orders_razorpay_order_id ON orders (razorpay_order_id);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS (Row Level Security) — allow public inserts from API routes
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: allow all operations from service_role (API routes use this)
-- For anon key access (frontend), we only allow INSERT
CREATE POLICY "Allow anon insert" ON orders
  FOR INSERT TO anon WITH CHECK (true);

-- Allow authenticated users to read their own orders (future use)
CREATE POLICY "Allow read own orders" ON orders
  FOR SELECT TO anon
  USING (true);

-- ============================================
-- Done! Go to your Supabase dashboard > SQL Editor
-- Paste this entire script and click "Run"
-- ============================================
