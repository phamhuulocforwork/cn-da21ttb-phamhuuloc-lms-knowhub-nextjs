import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Role, User } from '@/types/user';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useToast } from '@/components/hooks/use-toast';
import { useTranslations } from 'next-intl';
import { userService } from '@/services/userService';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const editUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  role: z.enum([Role.ADMIN, Role.TEACHER, Role.STUDENT, Role.GUEST]),
});

type EditUserFormData = z.infer<typeof editUserSchema>;

interface EditUserDialogProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function EditUserDialog({
  user,
  open,
  onClose,
  onSuccess,
}: EditUserDialogProps) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const t = useTranslations('admin.users.editUser');
  const tToast = useTranslations('toast');

  const form = useForm<EditUserFormData>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      role: user.role as Role,
    },
  });

  const onSubmit = async (data: EditUserFormData) => {
    try {
      setLoading(true);
      await userService.updateUser({
        id: user.id,
        ...data,
      });
      onSuccess();
      onClose();
      toast({
        variant: 'success',
        title: tToast('updateSuccess'),
      });
    } catch (error) {
      console.error('Failed to update user:', error);
      toast({
        variant: 'destructive',
        title: tToast('updateError'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('name')}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('email')}</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={loading} type='email' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('role')}</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(Role).map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex justify-end gap-2'>
              <Button variant='outline' onClick={onClose} disabled={loading}>
                {t('cancel')}
              </Button>
              <Button type='submit' disabled={loading}>
                {loading ? t('saving') : t('save')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
