import { LayoutGrid, List } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

interface ContentControlProps {
  title: string;
  count?: number;
  viewType: 'grid' | 'list';
  searchQuery: string;
  onViewChange: (value: 'grid' | 'list') => void;
  onSearchChange: (value: string) => void;
}

export function ContentControl({
  title,
  count,
  viewType,
  searchQuery,
  onViewChange,
  onSearchChange,
}: ContentControlProps) {
  return (
    <div className='flex items-center justify-between'>
      <h2 className='text-base font-semibold'>
        {title}{' '}
        {count && <span className='text-muted-foreground'>{count}</span>}
      </h2>
      <div className='flex gap-2'>
        <Input
          placeholder='Search...'
          className='w-full sm:w-[300px]'
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
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
    </div>
  );
}
