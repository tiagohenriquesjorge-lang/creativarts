-- ============================================
-- TESTE DE CONFIGURAÇÃO DO STORAGE
-- Execute este script para verificar se tudo está OK
-- ============================================

-- 1. VERIFICAR BUCKETS CRIADOS
-- ============================================
SELECT 
  '✅ BUCKETS CRIADOS' as status,
  id as bucket_id,
  name as bucket_name,
  public as is_public,
  created_at
FROM storage.buckets 
WHERE id IN ('product-images', 'category-images')
ORDER BY id;

-- Se retornar 2 linhas = ✅ OK
-- Se retornar 0 linhas = ❌ Execute storage-setup.sql primeiro


-- 2. VERIFICAR POLICIES DE LEITURA PÚBLICA
-- ============================================
SELECT 
  '✅ POLICIES DE LEITURA' as status,
  policyname as policy_name,
  cmd as command,
  qual as condition
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND policyname LIKE '%Public Access%'
ORDER BY policyname;

-- Deve retornar 2 policies (Product + Category)


-- 3. VERIFICAR POLICIES DE UPLOAD (INSERT)
-- ============================================
SELECT 
  '✅ POLICIES DE UPLOAD' as status,
  policyname as policy_name,
  cmd as command
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND cmd = 'INSERT'
  AND (policyname LIKE '%product%' OR policyname LIKE '%category%')
ORDER BY policyname;

-- Deve retornar 2 policies


-- 4. VERIFICAR POLICIES DE ATUALIZAÇÃO (UPDATE)
-- ============================================
SELECT 
  '✅ POLICIES DE UPDATE' as status,
  policyname as policy_name,
  cmd as command
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND cmd = 'UPDATE'
  AND (policyname LIKE '%product%' OR policyname LIKE '%category%')
ORDER BY policyname;

-- Deve retornar 2 policies


-- 5. VERIFICAR POLICIES DE REMOÇÃO (DELETE)
-- ============================================
SELECT 
  '✅ POLICIES DE DELETE' as status,
  policyname as policy_name,
  cmd as command
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND cmd = 'DELETE'
  AND (policyname LIKE '%product%' OR policyname LIKE '%category%')
ORDER BY policyname;

-- Deve retornar 2 policies


-- 6. RESUMO COMPLETO
-- ============================================
SELECT 
  '📊 RESUMO GERAL' as status,
  (SELECT COUNT(*) FROM storage.buckets WHERE id IN ('product-images', 'category-images')) as buckets_criados,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage' AND (policyname LIKE '%product%' OR policyname LIKE '%category%')) as policies_criadas;

-- Esperado:
-- buckets_criados: 2
-- policies_criadas: 8 (4 para produtos + 4 para categorias)


-- 7. VERIFICAR IMAGENS JÁ ENVIADAS (se houver)
-- ============================================
SELECT 
  '📸 IMAGENS NO STORAGE' as status,
  bucket_id,
  COUNT(*) as total_imagens,
  pg_size_pretty(SUM(metadata->>'size')::bigint) as tamanho_total
FROM storage.objects
WHERE bucket_id IN ('product-images', 'category-images')
GROUP BY bucket_id
ORDER BY bucket_id;

-- Se retornar vazio = Ainda não há imagens (normal)
-- Se retornar dados = Já existem imagens enviadas


-- ============================================
-- RESULTADO ESPERADO
-- ============================================
-- ✅ 2 buckets criados (product-images, category-images)
-- ✅ 8 policies criadas (4 por bucket)
-- ✅ Buckets públicos (public = true)
-- ✅ Policies permitem leitura pública
-- ✅ Policies permitem upload/update/delete para autenticados

-- Se tudo estiver OK, o sistema de upload está pronto! 🚀

