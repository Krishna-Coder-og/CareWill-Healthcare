import { Resource } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText, Video, FileSpreadsheet, Newspaper } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const getIcon = () => {
    switch (resource.type) {
      case 'pdf':
        return <FileText className="h-5 w-5 text-red-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-blue-500" />;
      case 'form':
        return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
      case 'article':
        return <Newspaper className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };
  
  return (
    <Card className="h-full flex flex-col hover-lift">
      <div className="relative pt-[56.25%] overflow-hidden rounded-t-lg">
        <img
          src={resource.thumbnail || 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'}
          alt={resource.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={e => { (e.currentTarget as HTMLImageElement).src = 'https://images.pexels.com/photos/3683074/pexels-photo-3683074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'; }}
        />
        <Badge 
          className="absolute top-2 right-2 flex items-center gap-1"
          variant="secondary"
        >
          {getIcon()}
          <span className="uppercase text-xs">{resource.type}</span>
        </Badge>
      </div>
      
      <CardContent className="flex-grow py-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {formatDate(resource.date)}
            </span>
          </div>
          <h3 className="font-medium text-lg line-clamp-2">{resource.title}</h3>
          <p className="text-sm text-muted-foreground line-clamp-3">
            {resource.description}
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {resource.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <Button variant="outline" className="w-full" asChild>
          <a href={resource.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Resource
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}