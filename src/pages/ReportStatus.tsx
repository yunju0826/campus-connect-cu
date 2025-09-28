import { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Report {
  id: string;
  category: string;
  building: string;
  location: string;
  description: string;
  status: 'submitted' | 'reviewing' | 'in-progress' | 'resolved' | 'rejected';
  submittedAt: string;
  updatedAt: string;
  priority: 'low' | 'medium' | 'high';
}

const mockReports: Report[] = [
  {
    id: 'RPT-001',
    category: '엘리베이터 문제',
    building: '미카엘관',
    location: '3층 남쪽 엘리베이터',
    description: '엘리베이터 문이 자주 고장나서 닫히지 않습니다',
    status: 'in-progress',
    submittedAt: '2024-01-15 09:30',
    updatedAt: '2024-01-16 14:20',
    priority: 'high'
  },
  {
    id: 'RPT-002',
    category: '시설 손상',
    building: '루카관',
    location: '1층 화장실',
    description: '화장실 문 손잡이가 부러졌습니다',
    status: 'resolved',
    submittedAt: '2024-01-14 16:45',
    updatedAt: '2024-01-15 11:30',
    priority: 'medium'
  },
  {
    id: 'RPT-003',
    category: '접근성 문제',
    building: '토마스관',
    location: '출입구',
    description: '휠체어 경사로가 너무 가파릅니다',
    status: 'reviewing',
    submittedAt: '2024-01-16 08:15',
    updatedAt: '2024-01-16 08:15',
    priority: 'medium'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'submitted':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'reviewing':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-orange-500" />;
    case 'resolved':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'rejected':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'submitted':
      return '접수됨';
    case 'reviewing':
      return '검토중';
    case 'in-progress':
      return '처리중';
    case 'resolved':
      return '해결됨';
    case 'rejected':
      return '반려됨';
    default:
      return status;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'submitted':
      return 'secondary';
    case 'reviewing':
      return 'default';
    case 'in-progress':
      return 'default';
    case 'resolved':
      return 'default';
    case 'rejected':
      return 'destructive';
    default:
      return 'secondary';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50';
    case 'low':
      return 'text-green-600 bg-green-50';
    default:
      return 'text-gray-600 bg-gray-50';
  }
};

export default function ReportStatus() {
  const [reports] = useState<Report[]>(mockReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.building.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-16 pb-20 md:pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">신고 현황</h1>
          <p className="text-muted-foreground">제출한 신고의 처리 상황을 확인하세요</p>
        </div>

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>검색 및 필터</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="신고 번호, 건물명, 내용으로 검색..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="상태 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="submitted">접수됨</SelectItem>
                  <SelectItem value="reviewing">검토중</SelectItem>
                  <SelectItem value="in-progress">처리중</SelectItem>
                  <SelectItem value="resolved">해결됨</SelectItem>
                  <SelectItem value="rejected">반려됨</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">전체 신고</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-500">1</div>
              <div className="text-sm text-muted-foreground">처리중</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">1</div>
              <div className="text-sm text-muted-foreground">해결됨</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-500">1</div>
              <div className="text-sm text-muted-foreground">검토중</div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {filteredReports.map((report) => (
            <Card key={report.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(report.status)}
                    <div>
                      <CardTitle className="text-lg">{report.id}</CardTitle>
                      <CardDescription>{report.category} • {report.building}</CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={getStatusVariant(report.status)}
                      className="shrink-0"
                    >
                      {getStatusText(report.status)}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`shrink-0 ${getPriorityColor(report.priority)}`}
                    >
                      {report.priority === 'high' ? '높음' : 
                       report.priority === 'medium' ? '보통' : '낮음'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">위치</p>
                    <p>{report.location}</p>
                  </div>
                  <div>
                    <p className="font-medium text-sm text-muted-foreground">내용</p>
                    <p className="text-sm">{report.description}</p>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>신고일: {report.submittedAt}</span>
                    <span>최종 업데이트: {report.updatedAt}</span>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      상세 보기
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredReports.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">신고 내역이 없습니다</h3>
              <p className="text-muted-foreground mb-4">
                아직 제출된 신고가 없거나 검색 조건에 맞는 신고가 없습니다.
              </p>
              <Button onClick={() => window.location.href = '/report'}>
                새 신고 작성
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}