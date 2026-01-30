import { Card, CardContent, CardHeader } from '@/components/ui/card'

function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className ?? ''}`} />
}

export default function StudyLoading() {
  return (
    <div className="container max-w-3xl py-6 px-4">
      {/* Header skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Main card skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Skeleton className="size-5" />
            <Skeleton className="h-5 w-32" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Skeleton className="h-20 rounded-lg" />
            <Skeleton className="h-20 rounded-lg" />
          </div>
        </CardContent>
      </Card>

      {/* Stats cards skeleton */}
      <div className="mb-6">
        <Skeleton className="h-6 w-24 mb-4" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="size-5 mb-2" />
                <Skeleton className="h-8 w-12 mb-1" />
                <Skeleton className="h-3 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Content card skeleton */}
      <Card className="mb-6">
        <CardHeader>
          <Skeleton className="h-5 w-40 mb-1" />
          <Skeleton className="h-4 w-56" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-8" />
              </div>
            ))}
            <Skeleton className="h-2 w-full mt-4" />
            <Skeleton className="h-3 w-24 mx-auto" />
          </div>
        </CardContent>
      </Card>

      {/* Action link skeleton */}
      <Skeleton className="h-14 w-full rounded-lg" />
    </div>
  )
}
