import { Loader2 } from 'lucide-react'

export default function GlobalLoading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center">
      <Loader2 className="size-10 animate-spin text-muted-foreground" aria-hidden="true" />
      <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
    </div>
  )
}
