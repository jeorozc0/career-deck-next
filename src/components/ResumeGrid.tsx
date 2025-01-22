import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, FileEdit, Download, Trash2 } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"

type Resume = {
  id: string
  title: string
  lastModified: string
  isPrimary: boolean
  thumbnailUrl: string
}

const mockResumes: Resume[] = [
  {
    id: '1',
    title: 'Software Engineer Resume',
    lastModified: '2023-05-15',
    isPrimary: true,
    thumbnailUrl: '/placeholder.svg?height=200&width=150'
  },
  {
    id: '2',
    title: 'Project Manager CV',
    lastModified: '2023-05-10',
    isPrimary: false,
    thumbnailUrl: '/placeholder.svg?height=200&width=150'
  },
]

export default function ResumeGrid() {
  if (mockResumes.length === 0) {
    return (
      <section className="mb-8 text-center py-12">
        <Image
          src="/placeholder.svg?height=200&width=200"
          alt="No resumes"
          width={200}
          height={200}
          className="mx-auto mb-4"
        />
        <h2 className="text-2xl font-semibold mb-2">Create your first resume</h2>
        <p className="text-muted-foreground mb-4">Get started by creating a new resume or importing an existing one.</p>
        <Button>Create Resume</Button>
      </section>
    )
  }

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-4">My Resumes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockResumes.map((resume) => (
          <Card key={resume.id} className="hover:border-primary transition-colors">
            <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {resume.title}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <FileEdit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download PDF</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center py-4">
                <Image
                  src={resume.thumbnailUrl || "/placeholder.svg"}
                  alt={resume.title}
                  width={150}
                  height={200}
                  className="rounded-md shadow-sm"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-xs text-muted-foreground">
                Last modified: {resume.lastModified}
              </div>
              {resume.isPrimary && (
                <Badge variant="secondary">Primary</Badge>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

