import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Mail, Briefcase, MapPin } from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-accent p-4">
      <Card className="w-full max-w-2xl bg-card/80 backdrop-blur-sm shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <CardTitle className="text-3xl font-bold">John Doe</CardTitle>
            <p className="text-muted-foreground">Software Developer</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">React</Badge>
            <Badge variant="secondary">Next.js</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="secondary">Node.js</Badge>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-muted-foreground" />
              <span>john.doe@example.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <Briefcase className="text-muted-foreground" />
              <span>TechCorp Inc.</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-muted-foreground" />
              <span>San Francisco, CA</span>
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-lg font-semibold mb-2">About Me</h3>
            <p className="text-muted-foreground">
              Passionate software developer with 5 years of experience in building web applications.
              I love working with cutting-edge technologies and solving complex problems.
            </p>
          </div>

          <div className="flex justify-center pt-4">
            <Button>Edit Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


