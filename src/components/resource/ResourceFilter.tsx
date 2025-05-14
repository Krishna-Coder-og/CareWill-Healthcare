import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, X } from 'lucide-react';
import { resourceCategories } from '@/data/mockData';
import { useResourceStore } from '@/store';
import { debounce } from '@/lib/utils';
import { useEffect, useMemo } from 'react';

export function ResourceFilter() {
  const { 
    setSearchTerm, 
    setSelectedCategory, 
    toggleTag, 
    searchTerm, 
    selectedCategory,
    selectedTags,
    resources
  } = useResourceStore();
  
  // Get all unique tags from resources
  const allTags = useMemo(() => {
    const tags = resources.flatMap(resource => resource.tags);
    return Array.from(new Set(tags));
  }, [resources]);
  
  // Debounced search handler
  const handleSearchChange = useMemo(
    () => debounce((value: string) => setSearchTerm(value), 300),
    [setSearchTerm]
  );
  
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          defaultValue={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search resources..."
          className="pl-10"
          aria-label="Search resources"
        />
      </div>
      
      <Tabs defaultValue="all" onValueChange={(value) => setSelectedCategory(value === 'all' ? null : value)}>
        <TabsList className="w-full justify-start overflow-auto">
          <TabsTrigger value="all" className="flex-shrink-0">
            All
          </TabsTrigger>
          {resourceCategories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="flex-shrink-0">
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Tags</h3>
          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto py-1 px-2 text-xs"
              onClick={() => selectedTags.forEach(tag => toggleTag(tag))}
            >
              Clear all
            </Button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map(tag => {
            const isSelected = selectedTags.includes(tag);
            return (
              <Badge
                key={tag}
                variant={isSelected ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
                {isSelected && <X className="ml-1 h-3 w-3" />}
              </Badge>
            );
          })}
        </div>
      </div>
    </div>
  );
}