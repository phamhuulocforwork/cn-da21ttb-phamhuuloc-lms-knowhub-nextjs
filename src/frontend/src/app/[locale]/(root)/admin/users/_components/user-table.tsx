import { MoreVertical } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { User } from '@/types/user';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const t = useTranslations('admin.users.table');

  return (
    <Table>
      <TableHeader className='bg-primary text-primary-foreground'>
        <TableRow>
          <TableHead className='w-12'>#</TableHead>
          <TableHead>{t('userName')}</TableHead>
          <TableHead>{t('role')}</TableHead>
          <TableHead>{t('createdAt')}</TableHead>
          <TableHead className='w-12'></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user.id}>
            <TableCell className='text-muted-foreground'>{index + 1}</TableCell>
            <TableCell>
              <div className='flex items-center gap-3'>
                <Avatar>
                  <AvatarImage src={user.image} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className='flex flex-col'>
                  <span className='font-medium'>{user.name}</span>
                  <span className='text-muted-foreground text-sm'>
                    {user.email}
                  </span>
                </div>
              </div>
            </TableCell>
            <TableCell>
              <Badge
                variant={user.role === 'ADMIN' ? 'default' : 'secondary'}
                className={
                  user.role === 'ADMIN'
                    ? 'bg-green-100 text-green-800 hover:bg-green-100'
                    : user.role === 'TEACHER'
                      ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                      : 'bg-purple-100 text-purple-800 hover:bg-purple-100'
                }
              >
                {user.role}
              </Badge>
            </TableCell>
            <TableCell>
              <span className='text-muted-foreground text-sm'>
                {new Date(user.createdAt).toLocaleDateString()}
              </span>
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='h-8 w-8 p-0'>
                    <MoreVertical className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem onClick={() => onEdit(user)}>
                    {t('actions.edit')}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(user.id)}>
                    {t('actions.delete')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
