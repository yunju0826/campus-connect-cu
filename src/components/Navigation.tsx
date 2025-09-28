import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  Map, 
  MessageSquare, 
  Bell, 
  Phone, 
  ExternalLink, 
  BookOpen,
  Menu,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useIsMobile } from '@/hooks/use-mobile';
import universityLogo from '@/assets/cuk-logo-updated.png';

const navigationItems = [
  { href: '/', label: '캠퍼스 맵', icon: Map, key: 'map' },
  { href: '/reports', label: '신고 현황', icon: MessageSquare, key: 'reports' },
  { href: '/notices', label: '공지사항', icon: Bell, key: 'notices' },
  { href: '/contact', label: '연락처', icon: Phone, key: 'contact' },
  { href: '/links', label: '유용한 링크', icon: ExternalLink, key: 'links' },
  { href: '/resources', label: '학생 복지', icon: BookOpen, key: 'resources' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const location = useLocation();

  if (isMobile) {
    return (
      <>
        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-primary border-t border-border z-50">
          <div className="grid grid-cols-6 gap-1 px-2 py-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`flex flex-col items-center py-2 px-1 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-white/20 text-primary-foreground' 
                      : 'text-primary-foreground/70 hover:text-primary-foreground hover:bg-white/10'
                  }`}
                >
                  <item.icon className="h-4 w-4 mb-1" />
                  <span className="text-xs font-medium truncate w-full text-center">
                    {item.label.split(' ')[0]}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 bg-navy-gradient border-b border-border z-40">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-3">
              <img src={universityLogo} alt="University Logo" className="h-8 w-8" />
              <h1 className="text-lg font-bold text-primary-foreground">CUK 캠퍼스</h1>
            </div>
            <LanguageSwitcher />
          </div>
        </header>
      </>
    );
  }

  return (
    <header className="bg-navy-gradient border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <img src={universityLogo} alt="University Logo" className="h-10 w-10" />
            <h1 className="text-xl font-bold text-primary-foreground">가톨릭대학교 캠퍼스 리포터</h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-white/20 text-primary-foreground' 
                      : 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-white/10'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}