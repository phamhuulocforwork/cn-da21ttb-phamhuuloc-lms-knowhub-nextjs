'use client';

import { useCallback, useEffect, useState } from 'react';

import { Download, Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { PaginationControls } from '@/components/common/pagination-controls';
import { TableSkeleton } from '@/components/common/table-skeleton';
import { useDebounce } from '@/components/hooks/use-debounce';
import { useMinimumLoading } from '@/components/hooks/use-minimum-loading';
import { useToast } from '@/components/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { downloadExcel } from '@/lib/excel';

import { User } from '@/types/user';

import { userService } from '@/services/userService';

import { CreateUserDialog } from './create-user-dialog';
import { EditUserDialog } from './edit-user-dialog';
import { UserTable } from './user-table';

export default function UserManagement() {
  const t = useTranslations('admin.users');
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const { loading, withMinimumLoading } = useMinimumLoading(500);
  const { toast } = useToast();
  const tToast = useTranslations('toast');
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchUsers = useCallback(async () => {
    try {
      const { users, meta } = await withMinimumLoading(
        userService.getUsers({
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch,
        }),
      );
      setUsers(users);
      setTotalPages(meta.totalPages);
      setTotalUsers(meta.total);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, withMinimumLoading]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDeleteUser = async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setUserToDelete(user);
    }
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;

    try {
      await withMinimumLoading(
        Promise.all([userService.deleteUser(userToDelete.id), fetchUsers()]),
      );
      toast({
        variant: 'success',
        title: tToast('deleteSuccess'),
      });
    } catch (error) {
      console.error('Failed to delete user:', error);
      toast({
        variant: 'destructive',
        title: tToast('deleteError'),
      });
    } finally {
      setUserToDelete(null);
    }
  };

  const handleExportUsers = () => {
    downloadExcel(
      users.map((user) => ({
        Name: user.name,
        Email: user.email,
        Role: user.role,
        'Created At': user.createdAt,
      })),
      'Users',
    );
  };

  return (
    <div className='mx-4 py-10 md:mx-11'>
      <div className='space-y-4'>
        <div>
          <h1 className='text-2xl font-semibold'>{t('title')}</h1>
          <p className='text-muted-foreground'>{t('description')}</p>
        </div>

        <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
          <h2 className='text-base font-semibold'>
            {t('allUsers')}{' '}
            <span className='text-muted-foreground'>{totalUsers}</span>
          </h2>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center'>
            <div className='w-full sm:w-auto'>
              <Input
                placeholder={t('search')}
                className='w-full sm:w-[300px]'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className='flex gap-2'>
              <Button
                onClick={handleExportUsers}
                variant='outline'
                className='gap-2'
              >
                <Download className='h-4 w-4' />
                <span className='hidden sm:inline'>{t('export')}</span>
              </Button>
              <Button
                onClick={() => setShowCreateDialog(true)}
                className='gap-2'
              >
                <Plus className='h-4 w-4' />
                <span className='hidden sm:inline'>{t('addUser')}</span>
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : users && users.length > 0 ? (
          <UserTable
            users={users}
            onEdit={setEditingUser}
            onDelete={handleDeleteUser}
          />
        ) : (
          <div className='py-4 text-center'>{t('noData')}</div>
        )}

        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />

        {editingUser && (
          <EditUserDialog
            user={editingUser}
            open={!!editingUser}
            onClose={() => setEditingUser(null)}
            onSuccess={fetchUsers}
          />
        )}

        {showCreateDialog && (
          <CreateUserDialog
            open={showCreateDialog}
            onClose={() => setShowCreateDialog(false)}
            onSuccess={fetchUsers}
          />
        )}

        <AlertDialog
          open={!!userToDelete}
          onOpenChange={() => setUserToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('deleteUser.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('deleteUser.description', {
                  name: userToDelete?.name,
                })}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
              <AlertDialogAction
                className='bg-destructive-500 hover:bg-destructive-600'
                onClick={handleConfirmDelete}
              >
                {t('confirm')}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
