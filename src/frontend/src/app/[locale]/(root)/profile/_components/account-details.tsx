import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import type { UserProfile } from '@/types/profile';

interface Props {
  user: UserProfile;
}

export default async function AccountDetails({ user }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <span>Email Verification</span>
            <Badge variant={user.emailVerified ? 'default' : 'destructive'}>
              {user.emailVerified ? 'Verified' : 'Not Verified'}
            </Badge>
          </div>
          <div className='flex items-center justify-between'>
            <span>Account Created</span>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Last Updated</span>
            <span>{new Date(user.updatedAt).toLocaleDateString()}</span>
          </div>
          <div className='flex items-center justify-between'>
            <span>Role</span>
            <Badge variant='secondary'>{user.role}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
