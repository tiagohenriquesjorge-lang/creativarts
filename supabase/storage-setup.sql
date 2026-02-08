-- ============================================
-- SUPABASE STORAGE SETUP
-- Configuração de buckets para upload de imagens
-- ============================================

-- 1. Criar bucket para imagens de produtos
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Criar bucket para imagens de categorias
INSERT INTO storage.buckets (id, name, public)
VALUES ('category-images', 'category-images', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES (RLS)
-- ============================================

-- PRODUCT IMAGES POLICIES
-- ============================================

-- Permitir leitura pública de imagens de produtos
CREATE POLICY "Public Access to Product Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Permitir upload de imagens de produtos (autenticado)
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Permitir atualização de imagens de produtos (autenticado)
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- Permitir remoção de imagens de produtos (autenticado)
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND auth.role() = 'authenticated'
);

-- CATEGORY IMAGES POLICIES
-- ============================================

-- Permitir leitura pública de imagens de categorias
CREATE POLICY "Public Access to Category Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'category-images');

-- Permitir upload de imagens de categorias (autenticado)
CREATE POLICY "Authenticated users can upload category images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'category-images' 
  AND auth.role() = 'authenticated'
);

-- Permitir atualização de imagens de categorias (autenticado)
CREATE POLICY "Authenticated users can update category images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'category-images' 
  AND auth.role() = 'authenticated'
);

-- Permitir remoção de imagens de categorias (autenticado)
CREATE POLICY "Authenticated users can delete category images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'category-images' 
  AND auth.role() = 'authenticated'
);

-- ============================================
-- VERIFICAÇÃO
-- ============================================

-- Verificar buckets criados
SELECT id, name, public, created_at 
FROM storage.buckets 
WHERE id IN ('product-images', 'category-images');

-- Verificar policies criadas
SELECT schemaname, tablename, policyname 
FROM pg_policies 
WHERE tablename = 'objects' 
AND schemaname = 'storage';

