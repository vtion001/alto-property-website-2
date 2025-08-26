export default function ReviewsSkeleton() {
  return (
    <div className="py-32 bg-white">
      <div className="container">
        <div className="text-center space-y-8 mb-24">
          <div className="inline-block">
            <div className="text-xs tracking-[0.3em] text-brown-600 uppercase mb-2">Client Testimonials</div>
            <div className="w-16 h-px bg-brown-300 mx-auto"></div>
          </div>
          
          {/* Google Verified Badge Skeleton */}
          <div className="flex items-center justify-center gap-2 text-sm text-brown-600 mb-4">
            <div className="w-4 h-4 bg-brown-200 rounded-full animate-pulse"></div>
            <div className="w-24 h-4 bg-brown-200 rounded animate-pulse"></div>
          </div>
          
          <div className="w-96 h-16 bg-brown-200 rounded animate-pulse mx-auto mb-6"></div>
          
          {/* Rating Display Skeleton */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-6 bg-brown-200 rounded animate-pulse"></div>
              ))}
            </div>
            <div className="text-center">
              <div className="w-12 h-8 bg-brown-200 rounded animate-pulse mb-2"></div>
              <div className="w-16 h-4 bg-brown-200 rounded animate-pulse"></div>
            </div>
            <div className="text-center">
              <div className="w-16 h-8 bg-brown-200 rounded animate-pulse mb-2"></div>
              <div className="w-24 h-4 bg-brown-200 rounded animate-pulse"></div>
            </div>
          </div>
          
          <div className="w-96 h-6 bg-brown-200 rounded animate-pulse mx-auto"></div>
        </div>
        
        {/* Review Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-brown-50 rounded-2xl p-8 border border-brown-100">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 bg-brown-200 rounded-full animate-pulse mr-4"></div>
                <div className="flex-1">
                  <div className="w-32 h-5 bg-brown-200 rounded animate-pulse mb-2"></div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="w-4 h-4 bg-brown-200 rounded animate-pulse mr-1"></div>
                    ))}
                    <div className="w-20 h-4 bg-brown-200 rounded animate-pulse ml-2"></div>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="w-full h-4 bg-brown-200 rounded animate-pulse"></div>
                <div className="w-3/4 h-4 bg-brown-200 rounded animate-pulse"></div>
                <div className="w-1/2 h-4 bg-brown-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Button Skeleton */}
        <div className="flex justify-center">
          <div className="w-48 h-14 bg-brown-200 rounded-xl animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}


