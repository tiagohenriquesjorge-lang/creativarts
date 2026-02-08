export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-gray-light">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-4">
          <div className="absolute inset-0 border-4 border-brand-gray-light rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        
        {/* Text */}
        <p className="text-brand-gray-dark font-medium">A carregar...</p>
      </div>
    </div>
  )
}

