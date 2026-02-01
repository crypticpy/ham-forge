export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6">
      {/* Radio wave animation */}
      <div className="relative size-16">
        <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
        <div className="absolute inset-2 rounded-full border-2 border-primary/50 animate-ping animation-delay-150" />
        <div className="absolute inset-4 rounded-full border-2 border-primary/70 animate-ping animation-delay-300" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="size-4 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">Loading HamForge...</p>
    </div>
  )
}
