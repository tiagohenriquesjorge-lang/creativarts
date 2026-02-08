'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { Eye, RotateCw } from 'lucide-react'

interface ProductPreviewProps {
  productImage: string
  customText?: string
  customTextPosition?: string
  customImage?: string | null
  productName: string
}

export default function ProductPreview({
  productImage,
  customText = '',
  customTextPosition = 'frente',
  customImage = null,
  productName,
}: ProductPreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [showBack, setShowBack] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    canvas.width = 600
    canvas.height = 600

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Load and draw product image
    const productImg = new window.Image()
    productImg.crossOrigin = 'anonymous'
    productImg.src = productImage
    
    productImg.onload = () => {
      // Draw product image (centered and scaled)
      const scale = Math.min(
        canvas.width / productImg.width,
        canvas.height / productImg.height
      ) * 0.8
      
      const x = (canvas.width - productImg.width * scale) / 2
      const y = (canvas.height - productImg.height * scale) / 2
      
      ctx.drawImage(
        productImg,
        x,
        y,
        productImg.width * scale,
        productImg.height * scale
      )

      // Draw custom image if provided
      if (customImage) {
        const customImg = new window.Image()
        customImg.src = customImage
        customImg.onload = () => {
          const imgScale = 0.3 // 30% of canvas
          const imgWidth = canvas.width * imgScale
          const imgHeight = (customImg.height / customImg.width) * imgWidth
          
          const imgX = (canvas.width - imgWidth) / 2
          const imgY = canvas.height * 0.35 // Position in center-top area
          
          ctx.drawImage(customImg, imgX, imgY, imgWidth, imgHeight)
          
          // Draw text below image if both exist
          if (customText) {
            drawText(ctx, canvas, customText, canvas.height * 0.65)
          }
        }
      } else if (customText) {
        // Draw only text if no image
        drawText(ctx, canvas, customText, canvas.height * 0.5)
      }
    }
  }, [productImage, customText, customImage, showBack])

  const drawText = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    text: string,
    yPosition: number
  ) => {
    ctx.font = 'bold 36px Arial, sans-serif'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    
    // Add text shadow for better visibility
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)'
    ctx.shadowBlur = 4
    ctx.shadowOffsetX = 2
    ctx.shadowOffsetY = 2
    
    ctx.fillText(text, canvas.width / 2, yPosition)
    
    // Reset shadow
    ctx.shadowColor = 'transparent'
    ctx.shadowBlur = 0
  }

  const hasCustomization = customText || customImage

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Eye className="h-5 w-5 text-brand-blue" />
          <h3 className="font-heading font-semibold text-lg">Preview do Produto</h3>
        </div>
        
        {hasCustomization && (
          <button
            onClick={() => setShowBack(!showBack)}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-brand-blue hover:bg-brand-blue/10 rounded-lg transition-colors"
          >
            <RotateCw className="h-4 w-4" />
            {showBack ? 'Frente' : 'Costas'}
          </button>
        )}
      </div>

      {/* Preview Canvas */}
      <div className="relative bg-gradient-to-br from-brand-gray-light/50 to-white rounded-lg p-8 border-2 border-brand-gray-light">
        {!hasCustomization && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80 rounded-lg z-10">
            <div className="text-center">
              <Eye className="h-12 w-12 mx-auto mb-3 text-brand-gray-dark/30" />
              <p className="text-brand-gray-dark/60 font-medium">
                Adicione texto ou imagem para ver o preview
              </p>
            </div>
          </div>
        )}

        <div className="relative aspect-square max-w-md mx-auto">
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-lg shadow-lg"
          />
        </div>

        {/* Position Indicator */}
        {hasCustomization && (
          <div className="mt-4 text-center">
            <span className="inline-flex items-center px-3 py-1 bg-brand-blue/10 text-brand-blue text-sm font-medium rounded-full">
              Posição: {customTextPosition}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="bg-brand-blue/5 rounded-lg p-3 text-sm text-brand-gray-dark/80">
        <p className="flex items-start gap-2">
          <span className="text-brand-blue mt-0.5">ℹ️</span>
          <span>
            Este é um preview aproximado. O produto final pode ter pequenas variações de cor e posicionamento.
          </span>
        </p>
      </div>
    </div>
  )
}

