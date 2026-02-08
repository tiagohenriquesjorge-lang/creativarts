-- Add placeholder images to products
-- Execute este script no Supabase SQL Editor para adicionar imagens aos produtos

-- Get product IDs
DO $$
DECLARE
  prod_tshirt UUID;
  prod_cap UUID;
  prod_keychain UUID;
  prod_pen UUID;
  prod_3d UUID;
BEGIN
  -- Get product IDs by slug
  SELECT id INTO prod_tshirt FROM products WHERE slug = 't-shirt-basica';
  SELECT id INTO prod_cap FROM products WHERE slug = 'bone-snapback';
  SELECT id INTO prod_keychain FROM products WHERE slug = 'porta-chaves-acrilico';
  SELECT id INTO prod_pen FROM products WHERE slug = 'caneta-metalica';
  SELECT id INTO prod_3d FROM products WHERE slug = 'figura-3d';

  -- Insert images for T-Shirt
  INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
  VALUES
    (prod_tshirt, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop', 'T-Shirt Branca', 0, true),
    (prod_tshirt, 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=800&fit=crop', 'T-Shirt Preta', 1, false);

  -- Insert images for Boné
  INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
  VALUES
    (prod_cap, 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&h=800&fit=crop', 'Boné Snapback', 0, true),
    (prod_cap, 'https://images.unsplash.com/photo-1575428652377-a2d80e2277fc?w=800&h=800&fit=crop', 'Boné Vista Lateral', 1, false);

  -- Insert images for Porta-chaves
  INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
  VALUES
    (prod_keychain, 'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&h=800&fit=crop', 'Porta-chaves Acrílico', 0, true);

  -- Insert images for Caneta
  INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
  VALUES
    (prod_pen, 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&h=800&fit=crop', 'Caneta Metálica', 0, true);

  -- Insert images for Impressão 3D
  INSERT INTO product_images (product_id, url, alt_text, position, is_primary)
  VALUES
    (prod_3d, 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=800&fit=crop', 'Figura 3D', 0, true);

  RAISE NOTICE 'Images added successfully!';
END $$;

