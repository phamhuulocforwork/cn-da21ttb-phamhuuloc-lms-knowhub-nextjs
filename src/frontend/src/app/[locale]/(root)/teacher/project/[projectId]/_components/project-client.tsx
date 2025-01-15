'use client';

import { useState } from 'react';

import CourseGrid from '@/components/blocks/course/course-grid';
import CourseList from '@/components/blocks/course/course-list';
import QuizGrid from '@/components/blocks/quiz/quiz-grid';
import { ContentControl } from '@/components/common/content-control';
import { PaginationControls } from '@/components/common/pagination-controls';
import { useDebounce } from '@/components/hooks/use-debounce';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { cn } from '@/lib/utils';

import { ProjectWithContent } from '@/types/project';

import { ProjectHeader } from './project-header';

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

export function ProjectClient({ project }: { project: ProjectWithContent }) {
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredCourses = project.courses.filter((course) =>
    course.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className='mx-4 flex min-h-screen flex-col justify-between md:mx-11'>
      <div>
        <ProjectHeader
          title={project.title}
          description={project.description || ''}
        />
        <Tabs defaultValue='course'>
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

          <TabsContent
            className='flex h-full flex-col justify-between'
            value='course'
          >
            <div className='mt-4 flex flex-col gap-4'>
              <ContentControl
                title='All courses'
                count={filteredCourses.length}
                viewType={viewType}
                searchQuery={searchQuery}
                onViewChange={setViewType}
                onSearchChange={setSearchQuery}
              />
              {viewType === 'grid' ? (
                <CourseGrid
                  projectId={project.id}
                  courses={paginatedCourses}
                  showStatus={true}
                />
              ) : (
                <CourseList
                  projectId={project.id}
                  courses={paginatedCourses}
                  showStatus={true}
                />
              )}
            </div>
          </TabsContent>

          <TabsContent value='quiz'>
            <div className='mt-4 flex flex-col gap-4'>
              <ContentControl
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
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <PaginationControls
        className='my-4'
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  );
}
