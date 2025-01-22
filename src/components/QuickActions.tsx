import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileUp, Linkedin } from 'lucide-react'

export default function QuickActions() {
  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Resume Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Create New Resume</CardTitle>
            <CardDescription>Start from scratch</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full">Create Resume</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Import from LinkedIn</CardTitle>
            <CardDescription>Coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>
              <Linkedin className="mr-2 h-4 w-4" />
              Import
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upload Existing Resume</CardTitle>
            <CardDescription>Coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" disabled>
              <FileUp className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

