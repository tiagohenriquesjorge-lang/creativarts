-- Function to increment coupon usage count
CREATE OR REPLACE FUNCTION increment_coupon_usage(coupon_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE coupons
  SET usage_count = usage_count + 1
  WHERE id = coupon_id;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_coupon_usage(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_coupon_usage(UUID) TO anon;

