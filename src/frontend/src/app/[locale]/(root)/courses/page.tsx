'use client';

import { useCallback, useEffect, useState } from 'react';

import CourseGrid from '@/components/blocks/course/course-grid';
import CourseList from '@/components/blocks/course/course-list';
import { ContentControl } from '@/components/common/content-control';
import { PaginationControls } from '@/components/common/pagination-controls';
import { useDebounce } from '@/components/hooks/use-debounce';
import { useMinimumLoading } from '@/components/hooks/use-minimum-loading';
import {
  CourseGridSkeleton,
  CourseListSkeleton,
} from '@/components/skeletons/course-skeleton';

import { Category } from '@/types/category';
import { Course } from '@/types/course';

import { categoryService } from '@/services/categoryService';
import { courseService } from '@/services/courseService';

export default function CoursesPage() {
  // States
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const { loading, withMinimumLoading } = useMinimumLoading(500);

  const debouncedSearch = useDebounce(searchQuery, 500);

  // Fetch categories
  const fetchCategories = useCallback(async () => {
    try {
      const { categories } = await categoryService.getCategories({
        page: 1,
        limit: 100,
      });
      setCategories(categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  // Fetch courses
  const fetchCourses = useCallback(async () => {
    try {
      const { courses: fetchedCourses, meta } = await withMinimumLoading(
        courseService.getCourses({
          page: currentPage,
          limit: itemsPerPage,
          search: debouncedSearch,
          categoryId: selectedCategory,
        }),
      );
      setCourses(fetchedCourses);
      setTotalPages(meta.totalPages);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  }, [
    currentPage,
    itemsPerPage,
    debouncedSearch,
    selectedCategory,
    withMinimumLoading,
  ]);

  // Initial fetch
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Fetch courses when dependencies change
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className='mx-4 flex min-h-screen flex-col justify-between md:mx-11'>
      <div>
        <div className='mt-4 flex flex-col gap-4'>
          <ContentControl
            title='All courses'
            count={courses.length}
            viewType={viewType}
            searchQuery={searchQuery}
            onViewChange={setViewType}
            onSearchChange={setSearchQuery}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />

          {loading ? (
            viewType === 'grid' ? (
              <CourseGridSkeleton />
            ) : (
              <CourseListSkeleton />
            )
          ) : viewType === 'grid' ? (
            <CourseGrid courses={courses} showStatus={false} projectId='' />
          ) : (
            <CourseList courses={courses} showStatus={false} projectId='' />
          )}
        </div>
      </div>

      {!loading && (
        <PaginationControls
          className='my-4'
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      )}
    </div>
  );
}
