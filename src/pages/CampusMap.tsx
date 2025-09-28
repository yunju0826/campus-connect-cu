import { useState } from 'react';
import { MapPin, Clock, AlertTriangle, Accessibility } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FloatingActionButton } from '@/components/FloatingActionButton';
import campusMapImage from '@/assets/real-campus-map.jpg';

interface MapIssue {
  id: string;
  type: 'elevator' | 'facility' | 'accessibility';
  location: string;
  position: { x: number; y: number };
  status: 'active' | 'resolved';
  waitTime?: number;
  description: string;
}

const mockIssues: MapIssue[] = [
  {
    id: '1',
    type: 'elevator',
    location: '미카엘관 3층',
    position: { x: 25, y: 35 },
    status: 'active',
    waitTime: 8,
    description: '엘리베이터 대기시간 길음'
  },
  {
    id: '2',
    type: 'facility',
    location: '성 토마스관 1층 화장실',
    position: { x: 45, y: 25 },
    status: 'active',
    description: '화장실 문 손잡이 고장'
  },
  {
    id: '3',
    type: 'accessibility',
    location: '성 루카관 정문',
    position: { x: 65, y: 45 },
    status: 'active',
    description: '휠체어 접근로 경사 가파름'
  },
  {
    id: '4',
    type: 'elevator',
    location: '성 요한관 엘리베이터',
    position: { x: 70, y: 30 },
    status: 'active',
    waitTime: 12,
    description: '점심시간 혼잡'
  },
  {
    id: '5',
    type: 'facility',
    location: '성 바오로관 계단',
    position: { x: 35, y: 60 },
    status: 'active',
    description: '계단 난간 손상'
  },
  {
    id: '6',
    type: 'accessibility',
    location: '중앙도서관 입구',
    position: { x: 50, y: 40 },
    status: 'active',
    description: '자동문 센서 불량'
  }
];

const getIssueIcon = (type: string) => {
  switch (type) {
    case 'elevator':
      return <Clock className="h-4 w-4" />;
    case 'facility':
      return <AlertTriangle className="h-4 w-4" />;
    case 'accessibility':
      return <Accessibility className="h-4 w-4" />;
    default:
      return <MapPin className="h-4 w-4" />;
  }
};

const getIssueColor = (type: string) => {
  switch (type) {
    case 'elevator':
      return 'bg-blue-500';
    case 'facility':
      return 'bg-red-500';
    case 'accessibility':
      return 'bg-green-500';
    default:
      return 'bg-gray-500';
  }
};

export default function CampusMap() {
  const [selectedIssue, setSelectedIssue] = useState<MapIssue | null>(null);

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-16 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">캠퍼스 맵</h1>
          <p className="text-muted-foreground">실시간 캠퍼스 정보를 확인하세요</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] relative overflow-hidden">
              <div 
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${campusMapImage})` }}
              >
                {/* Issue Pins */}
                {mockIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className={`absolute w-8 h-8 ${getIssueColor(issue.type)} rounded-full border-2 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform flex items-center justify-center`}
                    style={{ 
                      left: `${issue.position.x}%`, 
                      top: `${issue.position.y}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => setSelectedIssue(issue)}
                  >
                    <div className="text-white">
                      {getIssueIcon(issue.type)}
                    </div>
                  </div>
                ))}
                
                {/* Map Legend */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <h3 className="font-semibold text-sm mb-2">범례</h3>
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span>엘리베이터</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span>시설 손상</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span>접근성</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>실시간 정보</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-medium">미카엘관 엘리베이터</p>
                    <p className="text-sm text-muted-foreground">평균 대기시간</p>
                  </div>
                  <Badge variant="secondary">8분</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-medium">성 요한관 엘리베이터</p>
                    <p className="text-sm text-muted-foreground">평균 대기시간</p>
                  </div>
                  <Badge variant="destructive">12분</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <div>
                    <p className="font-medium">성 루카관 엘리베이터</p>
                    <p className="text-sm text-muted-foreground">평균 대기시간</p>
                  </div>
                  <Badge variant="outline">3분</Badge>
                </div>
              </CardContent>
            </Card>

            {selectedIssue && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    {getIssueIcon(selectedIssue.type)}
                    <span>선택된 이슈</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{selectedIssue.location}</p>
                    <p className="text-sm text-muted-foreground">{selectedIssue.description}</p>
                    {selectedIssue.waitTime && (
                      <Badge variant="secondary">대기시간: {selectedIssue.waitTime}분</Badge>
                    )}
                    <Button size="sm" className="w-full mt-3">
                      상세 정보 보기
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle>최근 신고</CardTitle>
                <CardDescription>지난 24시간 신고 현황</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-2xl font-bold text-primary">18</p>
                  <p className="text-sm text-muted-foreground">건의 신고</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <p className="font-medium">해결됨</p>
                    <p className="text-green-600">12건</p>
                  </div>
                  <div>
                    <p className="font-medium">처리중</p>
                    <p className="text-yellow-600">4건</p>
                  </div>
                  <div>
                    <p className="font-medium">대기중</p>
                    <p className="text-red-600">2건</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <FloatingActionButton />
    </div>
  );
}