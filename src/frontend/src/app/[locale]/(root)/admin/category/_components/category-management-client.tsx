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

import { Category } from '@/types/category';

import { categoryService } from '@/services/categoryService';

import { CategoryTable } from './category-table';
import { CreateCategoryDialog } from './create-category-dialog';
import { EditCategoryDialog } from './edit-category-dialog';

export default function CategoryManagement() {
  const t = useTranslations('admin.category');
  const tToast = useTranslations('toast');
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const { loading, withMinimumLoading } = useMinimumLoading(500);
  const { toast } = useToast();
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );

  const debouncedSearch = useDebounce(searchQuery, 500);

  const fetchCategories = useCallback(async () => {
    try {
      const { categories, meta } = await withMinimumLoading(
        categoryService.getCategories({
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch,
        }),
      );
      setCategories(categories);
      setTotalPages(meta.totalPages);
      setTotalCategories(meta.total);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, [currentPage, itemsPerPage, debouncedSearch, withMinimumLoading]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleDeleteCategory = async (categoryId: string) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      setCategoryToDelete(category);
    }
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await withMinimumLoading(
        Promise.all([
          categoryService.deleteCategory(categoryToDelete.id),
          fetchCategories(),
        ]),
      );
      toast({
        variant: 'success',
        title: tToast('deleteSuccess'),
      });
    } catch (error) {
      console.error('Failed to delete category:', error);
      toast({
        variant: 'destructive',
        title: tToast('deleteError'),
      });
    } finally {
      setCategoryToDelete(null);
    }
  };

  const handleExportCategories = () => {
    downloadExcel(
      categories.map((category) => ({
        Name: category.name,
        Description: category.description || '',
      })),
      'Categories',
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
            {t('allCategories')}{' '}
            <span className='text-muted-foreground'>{totalCategories}</span>
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
                onClick={handleExportCategories}
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
                <span className='hidden sm:inline'>{t('addCategory')}</span>
              </Button>
            </div>
          </div>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : categories && categories.length > 0 ? (
          <CategoryTable
            categories={categories}
            onEdit={setEditingCategory}
            onDelete={handleDeleteCategory}
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

        {editingCategory && (
          <EditCategoryDialog
            category={editingCategory}
            open={!!editingCategory}
            onClose={() => setEditingCategory(null)}
            onSuccess={fetchCategories}
          />
        )}

        {showCreateDialog && (
          <CreateCategoryDialog
            open={showCreateDialog}
            onClose={() => setShowCreateDialog(false)}
            onSuccess={fetchCategories}
          />
        )}

        <AlertDialog
          open={!!categoryToDelete}
          onOpenChange={() => setCategoryToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t('deleteCategory.title')}</AlertDialogTitle>
              <AlertDialogDescription>
                {t('deleteCategory.description', {
                  name: categoryToDelete?.name,
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
