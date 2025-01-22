import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { MapPin } from 'lucide-react'

export default function ProfileHeader() {
  // This would typically come from an API or state management
  const user = {
    name: "John Doe",
    role: "Senior Software Engineer",
    location: "San Francisco, CA",
  }

  return (
    <section className="bg-card rounded-lg p-6 mb-8 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.role}</p>
          <div className="flex items-center mt-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-1" />
            {user.location}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline">Edit Profile</Button>
          <Button>Create Resume</Button>
        </div>
      </div>
    </section>
  )
}

