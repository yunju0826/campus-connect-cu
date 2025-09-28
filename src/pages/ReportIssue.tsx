import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const issueCategories = [
  { value: 'elevator', label: '엘리베이터 문제' },
  { value: 'facility', label: '시설 손상' },
  { value: 'accessibility', label: '접근성 문제' },
  { value: 'safety', label: '안전 문제' },
  { value: 'other', label: '기타' },
];

const buildings = [
  '미카엘관', '루카관', '토마스관', '베드로관', '바오로관', 
  '프란치스코관', '마태오관', '요한관', '마르코관', '중앙도서관'
];

export default function ReportIssue() {
  const [formData, setFormData] = useState({
    category: '',
    building: '',
    location: '',
    description: '',
    urgent: false,
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newPhotos = Array.from(e.target.files);
      setPhotos(prev => [...prev, ...newPhotos].slice(0, 5)); // Max 5 photos
    }
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "신고가 접수되었습니다",
      description: "신고 내용을 검토한 후 처리하겠습니다.",
    });

    setIsSubmitting(false);
    navigate('/reports');
  };

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-16 pb-20 md:pb-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">문제 신고하기</h1>
          <p className="text-muted-foreground">캠퍼스 내 문제를 신고해 주세요</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>신고 정보</CardTitle>
            <CardDescription>
              정확한 정보를 입력해 주시면 빠른 처리가 가능합니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Category Selection */}
              <div className="space-y-2">
                <Label htmlFor="category">문제 유형 *</Label>
                <Select value={formData.category} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, category: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="문제 유형을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {issueCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Building Selection */}
              <div className="space-y-2">
                <Label htmlFor="building">건물명 *</Label>
                <Select value={formData.building} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, building: value }))
                }>
                  <SelectTrigger>
                    <SelectValue placeholder="건물을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {buildings.map((building) => (
                      <SelectItem key={building} value={building}>
                        {building}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Detailed Location */}
              <div className="space-y-2">
                <Label htmlFor="location">상세 위치 *</Label>
                <div className="flex space-x-2">
                  <Input
                    id="location"
                    placeholder="예: 3층 남쪽 엘리베이터 앞"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    required
                  />
                  <Button type="button" variant="outline" size="icon">
                    <MapPin className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">문제 설명 *</Label>
                <Textarea
                  id="description"
                  placeholder="문제 상황을 자세히 설명해 주세요"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="min-h-[100px]"
                  required
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>사진 첨부 (선택사항)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    사진을 업로드하면 더 빠른 처리가 가능합니다 (최대 5장)
                  </p>
                  <Button type="button" variant="outline" onClick={() => 
                    document.getElementById('photo-upload')?.click()
                  }>
                    사진 선택
                  </Button>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </div>
                
                {/* Photo Preview */}
                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Photo ${index + 1}`}
                          className="w-full h-20 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Urgency Checkbox */}
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgent"
                  checked={formData.urgent}
                  onChange={(e) => setFormData(prev => ({ ...prev, urgent: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="urgent" className="text-sm">
                  긴급한 문제입니다 (즉시 처리 필요)
                </Label>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>처리 중...</>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    신고 접수
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}