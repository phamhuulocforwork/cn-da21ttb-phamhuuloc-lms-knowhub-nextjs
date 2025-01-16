import { LayoutGrid, List, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

import { Category } from '@/types/category';

interface ContentControlProps {
  title: string;
  count: number;
  viewType: 'grid' | 'list';
  searchQuery: string;
  onViewChange: (value: 'grid' | 'list') => void;
  onSearchChange: (value: string) => void;
  categories?: Category[];
  selectedCategory?: string;
  onCategoryChange?: (value: string) => void;
}

export function ContentControl({
  title,
  count,
  viewType,
  searchQuery,
  onViewChange,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}: ContentControlProps) {
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>{title}</h2>
          <p className='text-sm text-muted-foreground'>
            {count} {count === 1 ? 'item' : 'items'}
          </p>
        </div>
        <ToggleGroup
          type='single'
          value={viewType}
          className='gap-0 rounded-md'
          onValueChange={(value) =>
            value && onViewChange(value as 'grid' | 'list')
          }
        >
          <ToggleGroupItem
            className='rounded-r-none border border-r-0'
            value='grid'
            aria-label='Grid view'
          >
            <LayoutGrid className='h-4 w-4' />
          </ToggleGroupItem>
          <ToggleGroupItem
            className='rounded-l-none border border-l-0'
            value='list'
            aria-label='List view'
          >
            <List className='h-4 w-4' />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-center'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground' />
          <Input
            placeholder='Search...'
            className='pl-9'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {categories && onCategoryChange && (
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className='w-full md:w-[180px]'>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
}
