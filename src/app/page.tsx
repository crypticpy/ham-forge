import Link from 'next/link'
import { Radio, BookOpen, ClipboardCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="mb-6 rounded-full bg-primary/10 p-4">
          <Radio className="size-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">Welcome to HamForge</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Your comprehensive study companion for amateur radio license exams. Practice questions,
          track your progress, and ace your Technician, General, or Extra class exam.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 max-w-2xl mx-auto mb-12">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">
              <BookOpen className="size-6 text-primary" />
            </div>
            <CardTitle>Practice Mode</CardTitle>
            <CardDescription>
              Study questions at your own pace with instant feedback and explanations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/practice">Start Practice</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="mb-2 rounded-lg bg-primary/10 p-2 w-fit">
              <ClipboardCheck className="size-6 text-primary" />
            </div>
            <CardTitle>Exam Simulation</CardTitle>
            <CardDescription>
              Take a timed practice exam that simulates the real testing experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild variant="outline" className="w-full">
              <Link href="/exam">Take Exam</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <div className="text-center">
        <h2 className="text-2xl font-semibold mb-6">Why HamForge?</h2>
        <div className="grid gap-4 md:grid-cols-3 max-w-4xl mx-auto">
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-medium mb-2">Offline Ready</h3>
            <p className="text-sm text-muted-foreground">
              Study anywhere, even without an internet connection.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-medium mb-2">Progress Tracking</h3>
            <p className="text-sm text-muted-foreground">
              Monitor your improvement and focus on weak areas.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <h3 className="font-medium mb-2">All License Classes</h3>
            <p className="text-sm text-muted-foreground">
              Comprehensive question pools for Tech, General, and Extra.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
