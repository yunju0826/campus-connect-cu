import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ContactInfo {
  department: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  hours: string;
  urgent?: boolean;
}

const contactList: ContactInfo[] = [
  {
    department: '시설관리팀',
    description: '건물 및 시설 관련 문의, 수리 요청',
    phone: '02-2164-4114',
    email: 'facility@catholic.ac.kr',
    location: '중앙관 1층',
    hours: '09:00 - 18:00 (평일)',
    urgent: true
  },
  {
    department: '학생처',
    description: '학생 생활 상담, 복지 관련 문의',
    phone: '02-2164-4200',
    email: 'student@catholic.ac.kr',
    location: '학생회관 2층',
    hours: '09:00 - 17:00 (평일)',
  },
  {
    department: '학사지원팀',
    description: '수강신청, 성적, 졸업 관련 문의',
    phone: '02-2164-4300',
    email: 'academic@catholic.ac.kr',
    location: '본관 3층',
    hours: '09:00 - 17:00 (평일)',
  },
  {
    department: '기숙사 관리사무소',
    description: '기숙사 생활, 시설 관련 문의',
    phone: '02-2164-4500',
    email: 'dormitory@catholic.ac.kr',
    location: '성심학사 1층',
    hours: '24시간 (비상시)',
  },
  {
    department: '정보시스템팀',
    description: '전산 시스템, 네트워크 관련 문의',
    phone: '02-2164-4700',
    email: 'it@catholic.ac.kr',
    location: '정보관 2층',
    hours: '09:00 - 17:00 (평일)',
  },
  {
    department: '보건센터',
    description: '응급처치, 건강 상담',
    phone: '02-2164-4800',
    email: 'health@catholic.ac.kr',
    location: '학생회관 1층',
    hours: '09:00 - 17:00 (평일)',
    urgent: true
  }
];

export default function Contact() {
  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-16 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">연락처</h1>
          <p className="text-muted-foreground">각 부서별 연락처 및 업무 시간을 확인하세요</p>
        </div>

        {/* Emergency Contacts */}
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center space-x-2">
              <Phone className="h-5 w-5" />
              <span>긴급 연락처</span>
            </CardTitle>
            <CardDescription className="text-red-600">
              응급상황 시 즉시 연락 가능한 번호입니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {contactList
                .filter(contact => contact.urgent)
                .map((contact, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <div>
                      <p className="font-medium text-red-700">{contact.department}</p>
                      <p className="text-sm text-red-600">{contact.phone}</p>
                    </div>
                    <Button 
                      size="sm" 
                      onClick={() => handleCall(contact.phone)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      전화하기
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* All Contacts */}
        <div className="grid gap-6">
          {contactList.map((contact, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl flex items-center space-x-2">
                      <span>{contact.department}</span>
                      {contact.urgent && (
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          긴급
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {contact.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">전화번호</p>
                        <p className="font-medium">{contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">이메일</p>
                        <p className="font-medium text-blue-600">{contact.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">위치</p>
                        <p className="font-medium">{contact.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">운영시간</p>
                        <p className="font-medium">{contact.hours}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2 mt-4">
                  <Button 
                    onClick={() => handleCall(contact.phone)}
                    className="flex-1"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    전화하기
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleEmail(contact.email)}
                    className="flex-1"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    이메일
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>추가 정보</CardTitle>
            <CardDescription>
              더 자세한 정보가 필요하시면 아래 링크를 확인하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="font-medium">전화번호부</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    전체 부서 연락처 확인
                  </p>
                </div>
              </Button>
              <Button variant="outline" className="justify-start h-auto p-4">
                <div className="text-left">
                  <div className="flex items-center space-x-2 mb-1">
                    <ExternalLink className="h-4 w-4" />
                    <span className="font-medium">캠퍼스 맵</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    건물 위치 및 찾아오는 길
                  </p>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}