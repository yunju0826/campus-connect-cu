import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ko' | 'en' | 'zh' | 'ja';

interface Translations {
  [key: string]: {
    ko: string;
    en: string;
    zh: string;
    ja: string;
  };
}

const translations: Translations = {
  // Navigation
  'nav.campusMap': {
    ko: '캠퍼스 맵',
    en: 'Campus Map',
    zh: '校园地图',
    ja: 'キャンパスマップ'
  },
  'nav.reportIssue': {
    ko: '문제 신고',
    en: 'Report Issue',
    zh: '问题举报',
    ja: '問題報告'
  },
  'nav.reportStatus': {
    ko: '신고 현황',
    en: 'Report Status',
    zh: '举报状态',
    ja: '報告状況'
  },
  'nav.notices': {
    ko: '공지사항',
    en: 'Notices',
    zh: '通知',
    ja: 'お知らせ'
  },
  'nav.contact': {
    ko: '문의하기',
    en: 'Contact',
    zh: '联系我们',
    ja: 'お問い合わせ'
  },
  'nav.quickLinks': {
    ko: '바로가기',
    en: 'Quick Links',
    zh: '快速链接',
    ja: 'クイックリンク'
  },
  'nav.studentResources': {
    ko: '학생 혜택',
    en: 'Student Resources',
    zh: '学生资源',
    ja: '学生リソース'
  },
  // Campus Map
  'map.title': {
    ko: '캠퍼스 맵',
    en: 'Campus Map',
    zh: '校园地图',
    ja: 'キャンパスマップ'
  },
  'map.subtitle': {
    ko: '실시간 캠퍼스 정보를 확인하세요',
    en: 'Check real-time campus information',
    zh: '查看实时校园信息',
    ja: 'リアルタイムキャンパス情報を確認'
  },
  'map.realTimeInfo': {
    ko: '실시간 정보',
    en: 'Real-time Info',
    zh: '实时信息',
    ja: 'リアルタイム情報'
  },
  'map.recentReports': {
    ko: '최근 신고',
    en: 'Recent Reports',
    zh: '最近举报',
    ja: '最近の報告'
  },
  'map.legend': {
    ko: '범례',
    en: 'Legend',
    zh: '图例',
    ja: '凡例'
  },
  'map.elevator': {
    ko: '엘리베이터',
    en: 'Elevator',
    zh: '电梯',
    ja: 'エレベーター'
  },
  'map.facilityDamage': {
    ko: '시설 손상',
    en: 'Facility Damage',
    zh: '设施损坏',
    ja: '施設損傷'
  },
  'map.accessibility': {
    ko: '접근성',
    en: 'Accessibility',
    zh: '无障碍',
    ja: 'アクセシビリティ'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}