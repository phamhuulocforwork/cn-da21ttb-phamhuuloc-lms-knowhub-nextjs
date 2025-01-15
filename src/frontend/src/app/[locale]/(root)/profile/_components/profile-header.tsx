import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

import type { UserProfile } from '@/types/profile';

interface Props {
  user: UserProfile;
}

export default function ProfileHeader({ user }: Props) {
  return (
    <div className='mb-8 flex items-center space-x-6'>
      <Avatar className='h-32 w-32'>
        <AvatarImage src={user.image || ''} alt={user.name} />
        <AvatarFallback>
          {user.name
            .split(' ')
            .map((n: string) => n[0])
            .join('')}
        </AvatarFallback>
      </Avatar>
      <div>
        <h1 className='mb-2 text-3xl font-bold'>{user.name}</h1>
        <div className='flex items-center space-x-2'>
          <p className='text-muted-foreground mb-2'>{user.email}</p>
          <Badge variant='secondary' className='mb-2'>
            {user.role}
          </Badge>
        </div>
        <p className='text-muted-foreground text-sm'>
          Joined{' '}
          {new Date(user.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
}
