import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Menu, 
  X, 
  Heart, 
  HelpCircle 
} from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Doctor Locator', path: '/doctors' },
  { name: 'Resources', path: '/resources' },
  { name: 'Health Records', path: '/health-records' },
  { name: 'About', path: '/about' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur border-b border-border">
      <div className="container flex h-16 items-center justify-between px-6 md:px-12">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-medical-green" />
            <span className="text-xl font-bold text-primary">CareWill</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.path
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button asChild variant="default" size="sm" className="ml-4">
            <Link to="/emergency">
              <HelpCircle className="mr-2 h-4 w-4" />
              Emergency
            </Link>
          </Button>
        </nav>
        
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container md:hidden px-6">
          <div className="flex flex-col space-y-3 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium py-2 px-1 transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary bg-muted rounded-md"
                    : "text-muted-foreground"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button asChild variant="default" size="sm" className="mt-4 w-full">
              <Link to="/emergency" onClick={() => setIsMenuOpen(false)}>
                <HelpCircle className="mr-2 h-4 w-4" />
                Emergency
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}