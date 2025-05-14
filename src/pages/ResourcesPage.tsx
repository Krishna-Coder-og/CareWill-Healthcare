import { ResourceCard } from '@/components/resource/ResourceCard';
import { ResourceFilter } from '@/components/resource/ResourceFilter';
import { useResourceStore } from '@/store';
import { useEffect } from 'react';
import { resourceCategories } from '@/data/mockData';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

export function ResourcesPage() {
  const { filteredResources, selectedCategory, setSelectedCategory } = useResourceStore();
  
  useEffect(() => {
    // Reset category on component mount
    setSelectedCategory(null);
  }, [setSelectedCategory]);
  
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl font-bold mb-4">Medical Resources</h1>
          <p className="text-lg opacity-90 max-w-2xl">
            Access research papers, forms, and educational content to better understand your health.
          </p>
        </div>
      </section>
      
      {/* Resources Section */}
      <section className="container mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <h2 className="text-xl font-semibold mb-4">Filter Resources</h2>
              <ResourceFilter />
            </div>
          </div>
          
          {/* Resources */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">
                {selectedCategory 
                  ? resourceCategories.find(cat => cat.id === selectedCategory)?.name 
                  : 'All Resources'}
              </h2>
              <p className="text-muted-foreground">
                {selectedCategory 
                  ? resourceCategories.find(cat => cat.id === selectedCategory)?.description 
                  : 'Browse all available medical resources'}
              </p>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Results</h3>
                <div className="text-sm text-muted-foreground">
                  {filteredResources.length} {filteredResources.length === 1 ? 'resource' : 'resources'} found
                </div>
              </div>
              
              {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredResources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-muted/30 rounded-lg">
                  <p className="text-muted-foreground">No resources found matching your criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}