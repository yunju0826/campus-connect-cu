import { useState } from 'react';
import { Bell, Calendar, ChevronRight, Megaphone, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Notice {
  id: string;
  title: string;
  content: string;
  type: 'general' | 'urgent' | 'maintenance';
  date: string;
  author: string;
  isImportant: boolean;
}

const mockNotices: Notice[] = [
  {
    id: '1',
    title: '미카엘관 엘리베이터 점검 안내',
    content: '2024년 1월 20일(토) 09:00~18:00 미카엘관 엘리베이터 정기점검이 실시됩니다. 해당 시간에는 계단을 이용해 주시기 바랍니다.',
    type: 'maintenance',
    date: '2024-01-18',
    author: '시설관리팀',
    isImportant: true
  },
  {
    id: '2',
    title: '캠퍼스 리포터 앱 업데이트 안내',
    content: '새로운 기능이 추가된 캠퍼스 리포터 앱이 업데이트되었습니다. 실시간 알림 기능과 개선된 사용자 인터페이스를 경험해보세요.',
    type: 'general',
    date: '2024-01-17',
    author: '정보시스템팀',
    isImportant: false
  },
  {
    id: '3',
    title: '긴급: 토마스관 1층 누수 발생',
    content: '토마스관 1층 중앙홀에서 누수가 발생하여 긴급 복구 작업을 진행중입니다. 해당 구역 출입을 자제해 주시기 바랍니다.',
    type: 'urgent',
    date: '2024-01-16',
    author: '시설관리팀',
    isImportant: true
  },
  {
    id: '4',
    title: '학생 복지시설 이용 안내',
    content: '학생회관 내 복지시설 운영시간이 변경되었습니다. 자세한 내용은 학생처 홈페이지를 참고해 주세요.',
    type: 'general',
    date: '2024-01-15',
    author: '학생처',
    isImportant: false
  }
];

const getNoticeIcon = (type: string) => {
  switch (type) {
    case 'urgent':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    case 'maintenance':
      return <Bell className="h-5 w-5 text-orange-500" />;
    default:
      return <Megaphone className="h-5 w-5 text-blue-500" />;
  }
};

const getNoticeTypeText = (type: string) => {
  switch (type) {
    case 'urgent':
      return '긴급';
    case 'maintenance':
      return '점검';
    case 'general':
      return '일반';
    default:
      return type;
  }
};

const getNoticeVariant = (type: string) => {
  switch (type) {
    case 'urgent':
      return 'destructive';
    case 'maintenance':
      return 'default';
    case 'general':
      return 'secondary';
    default:
      return 'secondary';
  }
};

export default function Notices() {
  const [notices] = useState<Notice[]>(mockNotices);
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredNotices = notices.filter(notice => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'important') return notice.isImportant;
    return notice.type === selectedTab;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-16 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">공지사항</h1>
          <p className="text-muted-foreground">캠퍼스 관련 중요한 소식을 확인하세요</p>
        </div>

        {/* Urgent Notices Banner */}
        {notices.some(notice => notice.type === 'urgent') && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <CardTitle className="text-red-700">긴급 공지</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              {notices
                .filter(notice => notice.type === 'urgent')
                .map((notice) => (
                  <div key={notice.id} className="flex items-center justify-between py-2">
                    <span className="text-red-700 font-medium">{notice.title}</span>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-700">
                      자세히 보기
                    </Button>
                  </div>
                ))}
            </CardContent>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">전체</TabsTrigger>
            <TabsTrigger value="important">중요</TabsTrigger>
            <TabsTrigger value="urgent">긴급</TabsTrigger>
            <TabsTrigger value="maintenance">점검</TabsTrigger>
            <TabsTrigger value="general">일반</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            <div className="space-y-4">
              {filteredNotices.map((notice) => (
                <Card key={notice.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getNoticeIcon(notice.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <CardTitle className="text-lg">{notice.title}</CardTitle>
                            {notice.isImportant && (
                              <Badge variant="destructive" className="text-xs">
                                중요
                              </Badge>
                            )}
                            <Badge variant={getNoticeVariant(notice.type)} className="text-xs">
                              {getNoticeTypeText(notice.type)}
                            </Badge>
                          </div>
                          <CardDescription className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <Calendar className="h-4 w-4" />
                              <span>{formatDate(notice.date)}</span>
                            </span>
                            <span>{notice.author}</span>
                          </CardDescription>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {notice.content}
                    </p>
                    <div className="flex justify-end">
                      <Button variant="outline" size="sm">
                        전체 내용 보기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredNotices.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">공지사항이 없습니다</h3>
                  <p className="text-muted-foreground">
                    선택한 카테고리에 해당하는 공지사항이 없습니다.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Subscription Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>알림 설정</span>
            </CardTitle>
            <CardDescription>
              중요한 공지사항을 놓치지 않도록 알림을 설정하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1">
                이메일 알림 설정
              </Button>
              <Button variant="outline" className="flex-1">
                SMS 알림 설정
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}