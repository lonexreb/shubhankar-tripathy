import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const LoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Header Skeleton */}
        <Card className="p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="space-y-2">
                <Skeleton className="h-12 w-80" />
                <Skeleton className="h-6 w-64" />
              </div>
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-20 w-full max-w-2xl" />
            </div>
            <div className="space-y-3 lg:min-w-[250px]">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Projects Skeleton */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-80 mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Skeleton className="h-6 w-40" />
                    <Skeleton className="h-5 w-16" />
                  </div>
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-16 w-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <div className="flex flex-wrap gap-1">
                      {[...Array(4)].map((_, j) => (
                        <Skeleton key={j} className="h-5 w-16" />
                      ))}
                    </div>
                  </div>
                  <Skeleton className="h-8 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills Skeleton */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-80 mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <Skeleton className="h-6 w-32 mx-auto" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="space-y-2 p-3 rounded-lg bg-muted/30">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <Skeleton className="h-5 w-32" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-3 w-8" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Experience Skeleton */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <Skeleton className="h-8 w-64 mx-auto" />
            <Skeleton className="h-4 w-80 mx-auto" />
          </div>
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <Card key={i}>
                <CardHeader className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div className="space-y-2">
                      <Skeleton className="h-7 w-64" />
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-40" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-5 w-20" />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className="h-5 w-16" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <div className="space-y-2">
                      {[...Array(3)].map((_, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <Skeleton className="h-2 w-2 mt-2" />
                          <Skeleton className="h-4 w-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Skeleton */}
        <Card className="p-8">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-16 w-full max-w-2xl mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoadingSkeleton;