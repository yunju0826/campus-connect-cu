import { Heart, DollarSign, Coffee, Utensils, Bus, Wifi, Printer, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Resource {
  name: string;
  location: string;
  hours: string;
  description: string;
  services: string[];
  contact?: string;
  isOpen?: boolean;
}

interface Scholarship {
  name: string;
  amount: string;
  eligibility: string;
  deadline: string;
  category: 'academic' | 'need' | 'special';
}

const welfareResources: Resource[] = [
  {
    name: '학생식당 (중앙)',
    location: '학생회관 1층',
    hours: '11:30 - 14:00, 17:00 - 19:00',
    description: '합리적인 가격의 한식 위주 메뉴',
    services: ['한식', '일품요리', '간식'],
    contact: '02-2164-4250',
    isOpen: true
  },
  {
    name: '카페테리아',
    location: '중앙도서관 1층',
    hours: '08:00 - 22:00',
    description: '커피, 음료, 간단한 식사 제공',
    services: ['커피', '음료', '샌드위치', '디저트'],
    isOpen: true
  },
  {
    name: '편의점 (CU)',
    location: '학생회관 지하1층',
    hours: '24시간',
    description: '일반 편의점 서비스',
    services: ['생필품', '식품', '문구용품', '택배'],
    isOpen: true
  },
  {
    name: '복사실',
    location: '각 건물 1층',
    hours: '08:00 - 18:00',
    description: '복사, 인쇄, 제본 서비스',
    services: ['복사', '컬러인쇄', '제본', '스캔'],
  },
  {
    name: '보건센터',
    location: '학생회관 1층',
    hours: '09:00 - 17:00 (평일)',
    description: '응급처치 및 기본 의료 서비스',
    services: ['응급처치', '건강상담', '약품지급'],
    contact: '02-2164-4800'
  },
  {
    name: '학생생활상담센터',
    location: '학생회관 2층',
    hours: '09:00 - 18:00 (평일)',
    description: '심리상담 및 진로상담',
    services: ['심리상담', '진로상담', '학습코칭'],
    contact: '02-2164-4900'
  }
];

const scholarships: Scholarship[] = [
  {
    name: '성적우수장학금',
    amount: '등록금 50-100%',
    eligibility: '직전학기 성적 3.5 이상',
    deadline: '매학기 초',
    category: 'academic'
  },
  {
    name: '가톨릭정신구현장학금',
    amount: '50-200만원',
    eligibility: '봉사활동 및 신앙활동 우수자',
    deadline: '9월 30일',
    category: 'special'
  },
  {
    name: '교내근로장학금',
    amount: '시급 9,620원',
    eligibility: '소득분위 8분위 이하',
    deadline: '수시 모집',
    category: 'need'
  },
  {
    name: '복지장학금',
    amount: '50-100만원',
    eligibility: '경제적 어려움 증명',
    deadline: '3월, 9월',
    category: 'need'
  }
];

const transportInfo = [
  {
    route: '마을버스 15번',
    description: '성신여대입구역 ↔ 가톨릭대학교',
    interval: '15-20분',
    fare: '1,500원'
  },
  {
    route: '지하철 4호선',
    description: '성신여대입구역 하차 후 버스 환승',
    walkTime: '도보 25분',
    fare: '1,370원'
  },
  {
    route: '마을버스 02번',
    description: '미아사거리역 ↔ 가톨릭대학교',
    interval: '20-25분',
    fare: '1,500원'
  }
];

const getScholarshipBadge = (category: string) => {
  switch (category) {
    case 'academic':
      return <Badge variant="default" className="bg-blue-100 text-blue-700">성적</Badge>;
    case 'need':
      return <Badge variant="default" className="bg-green-100 text-green-700">복지</Badge>;
    case 'special':
      return <Badge variant="default" className="bg-purple-100 text-purple-700">특별</Badge>;
    default:
      return <Badge variant="secondary">{category}</Badge>;
  }
};

export default function StudentResources() {
  return (
    <div className="min-h-screen bg-background pt-16 md:pt-16 pb-20 md:pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">학생 복지</h1>
          <p className="text-muted-foreground">캠퍼스 내 복지시설과 장학금 정보를 확인하세요</p>
        </div>

        <Tabs defaultValue="welfare" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="welfare">복지시설</TabsTrigger>
            <TabsTrigger value="scholarships">장학금</TabsTrigger>
            <TabsTrigger value="transport">교통정보</TabsTrigger>
          </TabsList>

          {/* Welfare Tab */}
          <TabsContent value="welfare">
            <div className="grid lg:grid-cols-2 gap-6">
              {welfareResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="text-lg">{resource.name}</CardTitle>
                        {resource.isOpen && (
                          <Badge variant="default" className="bg-green-100 text-green-700">
                            운영중
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{resource.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-muted-foreground">🕒</span>
                      <span>{resource.hours}</span>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">제공 서비스</p>
                      <div className="flex flex-wrap gap-1">
                        {resource.services.map((service, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    {resource.contact && (
                      <div className="pt-2 border-t">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full"
                          onClick={() => window.location.href = `tel:${resource.contact}`}
                        >
                          📞 {resource.contact}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Scholarships Tab */}
          <TabsContent value="scholarships">
            <div className="space-y-4">
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-700 flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>장학금 안내</span>
                  </CardTitle>
                  <CardDescription className="text-blue-600">
                    다양한 장학금 혜택을 확인하고 신청하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-700">15+</div>
                      <div className="text-sm text-blue-600">장학금 종류</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-700">60%</div>
                      <div className="text-sm text-blue-600">수혜 학생 비율</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-700">3월/9월</div>
                      <div className="text-sm text-blue-600">주요 신청 시기</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                {scholarships.map((scholarship, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{scholarship.name}</CardTitle>
                        {getScholarshipBadge(scholarship.category)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">지원 금액</p>
                        <p className="font-medium text-green-600">{scholarship.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">지원 자격</p>
                        <p className="text-sm">{scholarship.eligibility}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">신청 마감</p>
                        <p className="text-sm font-medium">{scholarship.deadline}</p>
                      </div>
                      <div className="pt-2 border-t">
                        <Button variant="outline" size="sm" className="w-full">
                          신청 방법 보기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>장학금 신청 안내</CardTitle>
                  <CardDescription>
                    장학금 신청은 Trinity 통합정보시스템에서 가능합니다
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={() => window.open('https://trinity.catholic.ac.kr', '_blank')}>
                      Trinity 바로가기
                    </Button>
                    <Button variant="outline">
                      장학금 안내서 다운로드
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transport Tab */}
          <TabsContent value="transport">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bus className="h-5 w-5" />
                    <span>교통 정보</span>
                  </CardTitle>
                  <CardDescription>
                    캠퍼스로 오는 다양한 교통편을 확인하세요
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {transportInfo.map((transport, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-medium">{transport.route}</h3>
                          <Badge variant="outline">{transport.fare}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{transport.description}</p>
                        <div className="flex space-x-4 text-xs text-muted-foreground">
                          {transport.interval && <span>배차간격: {transport.interval}</span>}
                          {transport.walkTime && <span>도보: {transport.walkTime}</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>🅿️</span>
                      <span>주차 정보</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">학생 주차장</p>
                      <p className="text-sm text-muted-foreground">시간당 1,000원</p>
                    </div>
                    <div>
                      <p className="font-medium">방문자 주차장</p>
                      <p className="text-sm text-muted-foreground">시간당 2,000원</p>
                    </div>
                    <div>
                      <p className="font-medium">운영시간</p>
                      <p className="text-sm text-muted-foreground">06:00 - 22:00</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>🚲</span>
                      <span>자전거 이용</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">자전거 보관소</p>
                      <p className="text-sm text-muted-foreground">각 건물 앞 설치</p>
                    </div>
                    <div>
                      <p className="font-medium">따릉이 대여소</p>
                      <p className="text-sm text-muted-foreground">정문 앞 위치</p>
                    </div>
                    <div>
                      <p className="font-medium">이용 팁</p>
                      <p className="text-sm text-muted-foreground">경사가 있어 전기자전거 추천</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}