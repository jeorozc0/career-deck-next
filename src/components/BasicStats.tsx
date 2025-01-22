import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function BasicStats() {
  // This would typically come from an API or state management
  const stats = {
    resumesCreated: 2,
    profileCompletion: 75,
    usageLimit: 50
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Resumes Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.resumesCreated}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profile Completion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{stats.profileCompletion}%</div>
            <Progress value={stats.profileCompletion} className="w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Usage Limits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{stats.usageLimit}%</div>
            <Progress value={stats.usageLimit} className="w-full" />
            <p className="text-xs text-muted-foreground mt-2">Free tier limit</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

