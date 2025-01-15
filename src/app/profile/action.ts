import prisma from '@/lib/db'
import { createClient } from '@/utils/supabase/server'

export async function getProfile() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error('Not authenticated');
  }

  const profile = await prisma.user.findUnique({
    where: { id: user.id },
    include: {
      skills: {
        include: {
          skill: true
        }
      }
    }
  });

  if (!profile) {
    throw new Error('Profile not found');
  }

  return profile;
}
