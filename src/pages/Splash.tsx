import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import universityLogo from '@/assets/cuk-logo-official.png';

export default function Splash() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowLogin(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login process
    setIsLoading(true);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  if (isLoading && !showLogin) {
    return (
      <div className="min-h-screen bg-navy-gradient flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <img 
            src={universityLogo} 
            alt="Catholic University of Korea" 
            className="h-32 w-32 mx-auto mb-8 animate-scale-in"
          />
          <h1 className="text-3xl font-bold text-primary-foreground mb-4">
            가톨릭대학교
          </h1>
          <p className="text-primary-foreground/80 text-lg">
            캠퍼스 리포터
          </p>
          <div className="mt-8">
            <div className="animate-pulse">
              <div className="h-1 bg-white/30 rounded-full mx-auto w-24">
                <div className="h-1 bg-white rounded-full animate-[slide-in-right_2s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-elevated">
        <CardHeader className="text-center pb-8">
          <img 
            src={universityLogo} 
            alt="Catholic University of Korea" 
            className="h-16 w-16 mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold text-primary">로그인</CardTitle>
          <CardDescription>
            학생 계정으로 로그인하여 캠퍼스 리포터를 이용하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="studentId">학번</Label>
              <Input 
                id="studentId" 
                type="text" 
                placeholder="학번을 입력하세요"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}