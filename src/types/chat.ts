
export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  attachments?: { type: 'video' | 'article' | 'growth' | 'image' | 'ai' | 'medical-report'; data: any }[];
}

export interface VideoAttachment {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  source: string;
}

export interface ArticleAttachment {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
}

export interface GrowthAttachment {
  date: string;
  weight: number;
  height: number;
  headCircumference: number;
}

export interface MedicalReportAttachment {
  id: string;
  date: string;
  summary: string;
  vitals: Record<string, string>;
  recommendations: string[];
}
