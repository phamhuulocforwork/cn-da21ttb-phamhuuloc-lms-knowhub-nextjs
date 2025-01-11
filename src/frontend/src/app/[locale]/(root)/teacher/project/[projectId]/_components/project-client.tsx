'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { ContentHeader } from '@/components/common/content-header';
import CourseGrid from '@/components/blocks/course/course-grid';
import CourseList from '@/components/blocks/course/course-list';
import { PaginationControls } from '@/components/common/pagination-controls';
import { ProjectHeader } from './project-header';
import { ProjectWithContent } from '@/types/project';
import QuizGrid from '@/components/blocks/quiz/quiz-grid';
import { cn } from '@/lib/utils';
import { useDebounce } from '@/components/hooks/use-debounce';
import { useState } from 'react';

const styles = {
  tabsList: cn(
    'flex h-9 w-full items-center justify-start gap-4',
    'rounded-none border-b border-border bg-transparent p-1',
  ),
  tabsTrigger: cn(
    'h-9 bg-transparent rounded-none px-3 py-1.5',
    'data-[state=active]:border-b-2 data-[state=active]:border-b-primary',
    'data-[state=active]:bg-transparent data-[state=active]:text-foreground',
    'data-[state=active]:dark:text-background data-[state=active]:shadow-none font-semibold',
  ),
};

export function ProjectClient({
  projectId,
  project,
}: {
  projectId: string;
  project: ProjectWithContent;
}) {
  // View state
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Filter courses based on search
  const filteredCourses = project.courses.filter((course) =>
    course.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className='mx-4 md:mx-11'>
      <ProjectHeader title={project.title} />
      <Tabs defaultValue='course' className='w-full'>
        <div className='flex items-center justify-between'>
          <TabsList className={styles.tabsList}>
            <TabsTrigger className={styles.tabsTrigger} value='course'>
              Course
            </TabsTrigger>
            <TabsTrigger className={styles.tabsTrigger} value='quiz'>
              Quiz
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value='course'>
          <div className='mt-4 flex flex-col gap-4'>
            <ContentHeader
              title='All courses'
              count={filteredCourses.length}
              viewType={viewType}
              searchQuery={searchQuery}
              onViewChange={setViewType}
              onSearchChange={setSearchQuery}
            />
            {viewType === 'grid' ? (
              <CourseGrid projectId={projectId} courses={paginatedCourses} />
            ) : (
              <CourseList projectId={projectId} courses={paginatedCourses} />
            )}
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </TabsContent>

        <TabsContent value='quiz'>
          <div className='mt-4 flex flex-col gap-4'>
            <ContentHeader
              title='All quizzes'
              count={project.quizzes.length}
              viewType={viewType}
              searchQuery={searchQuery}
              onViewChange={setViewType}
              onSearchChange={setSearchQuery}
            />
            {viewType === 'grid' ? (
              <QuizGrid quizzes={project.quizzes} />
            ) : null}
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              onItemsPerPageChange={setItemsPerPage}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
