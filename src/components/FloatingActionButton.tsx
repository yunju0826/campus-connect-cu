import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function FloatingActionButton() {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate('/report')}
      className="fixed bottom-20 md:bottom-8 right-4 h-14 w-14 rounded-full bg-primary hover:bg-primary/90 shadow-elevated z-40"
      size="icon"
    >
      <Plus className="h-6 w-6" />
    </Button>
  );
}