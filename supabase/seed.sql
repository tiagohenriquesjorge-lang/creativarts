-- Seed Data for CreativART's
-- Execute após criar schema e RLS policies

-- Insert Categories
INSERT INTO categories (name, slug, description, position, is_active) VALUES
('T-Shirts', 't-shirts', 'T-shirts personalizáveis em várias cores e tamanhos', 1, true),
('Bonés', 'bones', 'Bonés e chapéus personalizados', 2, true),
('Porta-chaves', 'porta-chaves', 'Porta-chaves personalizados em diversos materiais', 3, true),
('Canetas', 'canetas', 'Canetas personalizadas com gravação', 4, true),
('Impressões 3D', 'impressoes-3d', 'Objetos personalizados em impressão 3D', 5, true);

-- Get category IDs for reference
DO $$
DECLARE
  cat_tshirt UUID;
  cat_cap UUID;
  cat_keychain UUID;
  cat_pen UUID;
  cat_3d UUID;
  prod_id UUID;
BEGIN
  -- Get category IDs
  SELECT id INTO cat_tshirt FROM categories WHERE slug = 't-shirts';
  SELECT id INTO cat_cap FROM categories WHERE slug = 'bones';
  SELECT id INTO cat_keychain FROM categories WHERE slug = 'porta-chaves';
  SELECT id INTO cat_pen FROM categories WHERE slug = 'canetas';
  SELECT id INTO cat_3d FROM categories WHERE slug = 'impressoes-3d';

  -- Insert T-Shirt Products
  INSERT INTO products (name, slug, description, short_description, category_id, base_price, is_customizable, customization_options, tags, featured)
  VALUES (
    'T-Shirt Básica Personalizável',
    't-shirt-basica',
    'T-shirt 100% algodão, disponível em várias cores. Personalize com texto ou imagem.',
    'T-shirt 100% algodão',
    cat_tshirt,
    15.99,
    true,
    '{"allow_text": true, "max_text_length": 50, "allow_image_upload": true, "max_image_size_mb": 5, "allowed_image_formats": ["jpg", "png", "svg"]}',
    ARRAY['bestseller', 'novo'],
    true
  ) RETURNING id INTO prod_id;

  -- Insert variants for T-Shirt
  INSERT INTO product_variants (product_id, sku, name, color, size, price_adjustment, stock_quantity)
  VALUES
    (prod_id, 'TSHIRT-WHITE-S', 'Branca S', 'Branco', 'S', 0, 50),
    (prod_id, 'TSHIRT-WHITE-M', 'Branca M', 'Branco', 'M', 0, 100),
    (prod_id, 'TSHIRT-WHITE-L', 'Branca L', 'Branco', 'L', 0, 75),
    (prod_id, 'TSHIRT-BLACK-S', 'Preta S', 'Preto', 'S', 0, 50),
    (prod_id, 'TSHIRT-BLACK-M', 'Preta M', 'Preto', 'M', 0, 100),
    (prod_id, 'TSHIRT-BLACK-L', 'Preta L', 'Preto', 'L', 0, 75);

  -- Insert Boné
  INSERT INTO products (name, slug, description, short_description, category_id, base_price, is_customizable, customization_options, tags, featured)
  VALUES (
    'Boné Snapback Premium',
    'bone-snapback',
    'Boné ajustável com bordado personalizado. Material de alta qualidade.',
    'Boné ajustável premium',
    cat_cap,
    19.99,
    true,
    '{"allow_text": true, "max_text_length": 30, "allow_image_upload": true, "max_image_size_mb": 3}',
    ARRAY['popular'],
    true
  ) RETURNING id INTO prod_id;

  INSERT INTO product_variants (product_id, sku, name, color, price_adjustment, stock_quantity)
  VALUES
    (prod_id, 'CAP-BLACK', 'Preto', 'Preto', 0, 40),
    (prod_id, 'CAP-NAVY', 'Azul Marinho', 'Azul', 0, 35),
    (prod_id, 'CAP-RED', 'Vermelho', 'Vermelho', 0, 30);

  -- Insert Porta-chaves
  INSERT INTO products (name, slug, description, short_description, category_id, base_price, is_customizable, customization_options, tags, featured)
  VALUES (
    'Porta-chaves Acrílico',
    'porta-chaves-acrilico',
    'Porta-chaves em acrílico com impressão personalizada em alta qualidade.',
    'Porta-chaves acrílico',
    cat_keychain,
    4.99,
    true,
    '{"allow_text": true, "max_text_length": 20, "allow_image_upload": true, "max_image_size_mb": 2}',
    ARRAY['económico'],
    true
  ) RETURNING id INTO prod_id;

  INSERT INTO product_variants (product_id, sku, name, price_adjustment, stock_quantity)
  VALUES
    (prod_id, 'KEYCHAIN-ROUND', 'Redondo', 0, 200),
    (prod_id, 'KEYCHAIN-SQUARE', 'Quadrado', 0.50, 150),
    (prod_id, 'KEYCHAIN-HEART', 'Coração', 0.50, 100);

  -- Insert Caneta
  INSERT INTO products (name, slug, description, short_description, category_id, base_price, is_customizable, customization_options, tags, featured)
  VALUES (
    'Caneta Metálica Gravada',
    'caneta-metalica',
    'Caneta metálica com gravação laser. Perfeita para brindes corporativos.',
    'Caneta metálica premium',
    cat_pen,
    12.99,
    true,
    '{"allow_text": true, "max_text_length": 40, "allow_image_upload": false}',
    ARRAY['premium'],
    true
  ) RETURNING id INTO prod_id;

  INSERT INTO product_variants (product_id, sku, name, color, price_adjustment, stock_quantity)
  VALUES
    (prod_id, 'PEN-SILVER', 'Prateada', 'Prateado', 0, 80),
    (prod_id, 'PEN-GOLD', 'Dourada', 'Dourado', 2.00, 60),
    (prod_id, 'PEN-BLACK', 'Preta', 'Preto', 0, 70);

  -- Insert Impressão 3D
  INSERT INTO products (name, slug, description, short_description, category_id, base_price, is_customizable, customization_options, tags, featured)
  VALUES (
    'Figura Personalizada 3D',
    'figura-3d',
    'Figura personalizada em impressão 3D. Envie o seu modelo ou escolha entre os nossos designs.',
    'Figura 3D personalizada',
    cat_3d,
    29.99,
    true,
    '{"allow_text": false, "allow_image_upload": true, "max_image_size_mb": 10, "allowed_image_formats": ["stl", "obj"]}',
    ARRAY['inovador'],
    false
  ) RETURNING id INTO prod_id;

  INSERT INTO product_variants (product_id, sku, name, material, price_adjustment, stock_quantity)
  VALUES
    (prod_id, '3D-PLA-SMALL', 'Pequena (PLA)', 'PLA', 0, 20),
    (prod_id, '3D-PLA-MEDIUM', 'Média (PLA)', 'PLA', 10.00, 15),
    (prod_id, '3D-PLA-LARGE', 'Grande (PLA)', 'PLA', 20.00, 10);

  -- Insert Sample Coupons
  INSERT INTO coupons (code, type, value, min_purchase_amount, valid_from, valid_until, usage_limit, is_active)
  VALUES
    ('WELCOME10', 'percentage', 10, 20, NOW(), NOW() + INTERVAL '30 days', 100, true),
    ('SUMMER5', 'fixed', 5, 30, NOW(), NOW() + INTERVAL '60 days', 200, true),
    ('FIRSTORDER', 'percentage', 15, 25, NOW(), NOW() + INTERVAL '90 days', 50, true);

END $$;

