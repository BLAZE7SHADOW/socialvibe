import { clsx } from 'clsx'

interface SkeletonProps {
  className?: string
  variant?: 'text' | 'circular' | 'rectangular'
  width?: string | number
  height?: string | number
}

export default function Skeleton({ 
  className, 
  variant = 'rectangular',
  width,
  height 
}: SkeletonProps) {
  const variantClasses = {
    text: 'h-4',
    circular: 'rounded-full',
    rectangular: 'rounded'
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={clsx(
        'animate-pulse bg-gray-200 dark:bg-gray-700',
        variantClasses[variant],
        className
      )}
      style={style}
    />
  )
}

// Specific skeleton components
export function PostSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl border border-gray-200 dark:border-dark-border p-4 mb-4">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-3">
        <Skeleton variant="circular" className="w-10 h-10" />
        <div className="flex-1">
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>

      {/* Media */}
      <Skeleton className="w-full h-64 md:h-96 mb-3 rounded-lg" />

      {/* Actions */}
      <div className="flex items-center space-x-4 mb-2">
        <Skeleton variant="circular" className="w-6 h-6" />
        <Skeleton variant="circular" className="w-6 h-6" />
        <Skeleton variant="circular" className="w-6 h-6" />
      </div>

      {/* Caption */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-2" />
      <Skeleton className="h-3 w-20" />
    </div>
  )
}

export function ProfileHeaderSkeleton() {
  return (
    <div className="bg-white dark:bg-dark-surface rounded-xl p-6 border border-gray-200 dark:border-dark-border mb-6">
      <div className="flex flex-col md:flex-row md:items-start space-y-6 md:space-y-0 md:space-x-8">
        {/* Avatar */}
        <Skeleton variant="circular" className="w-32 h-32 md:w-40 md:h-40 mx-auto md:mx-0" />

        {/* Profile Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-4 mb-6">
            <Skeleton className="h-8 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>

          {/* Stats */}
          <div className="flex space-x-8 mb-6">
            <div>
              <Skeleton className="h-6 w-12 mb-1" />
              <Skeleton className="h-4 w-12" />
            </div>
            <div>
              <Skeleton className="h-6 w-16 mb-1" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div>
              <Skeleton className="h-6 w-16 mb-1" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>

          {/* Bio */}
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </div>
  )
}

export function ReelSkeleton() {
  return (
    <div className="aspect-[9/16] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden animate-pulse">
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton variant="circular" className="w-16 h-16" />
      </div>
    </div>
  )
}

export function UserCardSkeleton() {
  return (
    <div className="flex items-center space-x-3 p-3">
      <Skeleton variant="circular" className="w-12 h-12" />
      <div className="flex-1">
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  )
}

