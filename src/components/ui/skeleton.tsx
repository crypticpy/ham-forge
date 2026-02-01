import { cn } from '@/lib/utils'

interface SkeletonProps {
  className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} aria-hidden="true" />
}

// Preset skeleton shapes
export function SkeletonText({ className }: SkeletonProps) {
  return <Skeleton className={cn('h-4 w-full', className)} />
}

export function SkeletonCircle({ className }: SkeletonProps) {
  return <Skeleton className={cn('size-10 rounded-full', className)} />
}

export function SkeletonCard({ className }: SkeletonProps) {
  return <Skeleton className={cn('h-32 w-full rounded-lg', className)} />
}
