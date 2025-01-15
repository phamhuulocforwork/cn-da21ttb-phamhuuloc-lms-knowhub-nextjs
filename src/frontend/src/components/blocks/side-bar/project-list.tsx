'use client';

import { useEffect, useState } from 'react';

import { Plus, SquareMinus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Separator } from '@/components/ui/separator';
import {
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/side-bar';

import { Project } from '@/types/project';

import { projectService } from '@/services/projectService';

import { Link } from '@/i18n/routing';

export function ProjectList() {
  const t = useTranslations('sidebar');
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectService.getMyProjects();
        setProjects(response);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    };

    fetchProjects();
  }, []);

  if (!projects.length) {
    return null;
  }

  return (
    <>
      <Separator className='my-2' />
      <SidebarGroupLabel className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          {t('projects')}
          <span className='rounded-sm bg-slate-200 px-2 py-0.5 text-xs'>
            {projects.length}
          </span>
        </div>
        <Link
          href='/teacher/project/create'
          className='rounded-full border bg-background p-1'
        >
          <Plus className='h-3 w-3' />
        </Link>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {projects.map((project) => (
            <SidebarMenuItem
              key={project.id}
              className='flex items-center justify-center'
            >
              <SidebarMenuButton asChild>
                <a href={`/teacher/project/${project.id}`}>
                  <SquareMinus />
                  <span>{project.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </>
  );
}
