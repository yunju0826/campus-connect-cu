import { ExternalLink, GraduationCap, BookOpen, Users, Building, Heart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface QuickLink {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category: 'academic' | 'life' | 'external';
  isPopular?: boolean;
}

const quickLinks: QuickLink[] = [
  {
    title: '가톨릭대학교 홈페이지',
    description: '대학 공식 홈페이지',
    url: 'https://www.catholic.ac.kr',
    icon: <Building className="h-5 w-5" />,
    category: 'external',
    isPopular: true
  },
  {
    title: 'Trinity (통합정보시스템)',
    description: '수강신청, 성적조회, 학사정보',
    url: 'https://trinity.catholic.ac.kr',
    icon: <GraduationCap className="h-5 w-5" />,
    category: 'academic',
    isPopular: true
  },
  {
    title: 'Cyber Campus (사이버캠퍼스)',
    description: '온라인 강의 및 학습자료',
    url: 'https://cyber.catholic.ac.kr',
    icon: <BookOpen className="h-5 w-5" />,
    category: 'academic',
    isPopular: true
  },
  {
    title: 'CU 공유대학',
    description: '타 대학과의 공유 강좌',
    url: 'https://cu-share.catholic.ac.kr',
    icon: <Users className="h-5 w-5" />,
    category: 'academic'
  },
  {
    title: '중앙도서관',
    description: '도서 검색 및 대출 현황',
    url: 'https://library.catholic.ac.kr',
    icon: <BookOpen className="h-5 w-5" />,
    category: 'academic'
  },
  {
    title: '학생생활상담센터',
    description: '심리상담 및 진로상담',
    url: 'https://counsel.catholic.ac.kr',
    icon: <Heart className="h-5 w-5" />,
    category: 'life'
  },
  {
    title: '취업진로개발원',
    description: '취업정보 및 진로개발 프로그램',
    url: 'https://career.catholic.ac.kr',
    icon: <GraduationCap className="h-5 w-5" />,
    category: 'life'
  },
  {
    title: '국제교류처',
    description: '교환학생 및 해외연수 프로그램',
    url: 'https://international.catholic.ac.kr',
    icon: <Users className="h-5 w-5" />,
    category: 'life'
  }
];

const getCategoryTitle = (category: string) => {
  switch (category) {
    case 'academic':
      return '학사 관련';
    case 'life':
      return '학생 생활';
    case 'external':
      return '대학 공식';
    default:
      return category;
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'academic':
      return <GraduationCap className="h-5 w-5" />;
    case 'life':
      return <Heart className="h-5 w-5" />;
    case 'external':
      return <Building className="h-5 w-5" />;
    default:
      return <ExternalLink className="h-5 w-5" />;
  }
};

export default function QuickLinks() {
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const popularLinks = quickLinks.filter(link => link.isPopular);
  const categorizedLinks = {
    academic: quickLinks.filter(link => link.category === 'academic'),
    life: quickLinks.filter(link => link.category === 'life'),
    external: quickLinks.filter(link => link.category === 'external')
  };

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-16 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">유용한 링크</h1>
          <p className="text-muted-foreground">자주 사용하는 학교 사이트로 빠르게 이동하세요</p>
        </div>

        {/* Popular Links */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>⭐</span>
              <span>인기 사이트</span>
            </CardTitle>
            <CardDescription>
              학생들이 가장 많이 이용하는 사이트입니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {popularLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  onClick={() => handleLinkClick(link.url)}
                  className="h-auto p-4 justify-start hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className="text-primary">{link.icon}</div>
                    <div className="text-left flex-1">
                      <div className="font-medium text-sm">{link.title}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {link.description}
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Categorized Links */}
        <div className="space-y-8">
          {Object.entries(categorizedLinks).map(([category, links]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getCategoryIcon(category)}
                  <span>{getCategoryTitle(category)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {links.map((link, index) => (
                    <Button
                      key={index}
                      variant="ghost"
                      onClick={() => handleLinkClick(link.url)}
                      className="h-auto p-4 justify-start border border-border hover:shadow-md hover:border-primary/20 transition-all"
                    >
                      <div className="flex items-center space-x-3 w-full">
                        <div className="text-primary shrink-0">{link.icon}</div>
                        <div className="text-left flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{link.title}</div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {link.description}
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0" />
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Access Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>빠른 접근</CardTitle>
            <CardDescription>
              자주 사용하는 기능을 홈 화면에 추가하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <span>📱</span>
                    <span className="font-medium">앱 설치 안내</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    모바일 앱으로 더 편리하게 이용하세요
                  </p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <span>🔖</span>
                    <span className="font-medium">즐겨찾기 추가</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    브라우저 즐겨찾기에 추가하기
                  </p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-8 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-700">도움이 필요하시나요?</CardTitle>
            <CardDescription className="text-blue-600">
              링크가 작동하지 않거나 추가하고 싶은 사이트가 있다면 알려주세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                문의하기
              </Button>
              <Button variant="outline" className="flex-1 border-blue-200 text-blue-700">
                사이트 추가 요청
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}