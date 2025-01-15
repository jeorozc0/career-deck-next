import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react'
import { getProfile } from './action'

export default async function ProfilePage() {
  const profile = await getProfile()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Headline</h2>
          <p>{profile.headline}</p>
        </div>
        <div>
          <h2 className="font-semibold">Summary</h2>
          <p>{profile.summary}</p>
        </div>
        <div>
          <h2 className="font-semibold">Skills</h2>
          <div className="flex gap-2">
            {profile.skills.map((s: { id: Key | null | undefined; skill: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined } }) => (
              <span key={s.id} className="bg-gray-100 px-2 py-1 rounded">
                {s.skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
