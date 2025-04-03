
export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  attachments?: { type: 'video' | 'article' | 'growth' | 'image' | 'ai' | 'medical-report' | 'qr-code' | 'prescription'; data: any }[];
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

export interface QRCodeAttachment {
  type: 'appointment' | 'prescription' | 'medical-record' | 'birth-certificate';
  data: string;
  description: string;
}

export interface PrescriptionAttachment {
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
  }>;
  doctor: string;
  issueDate: string;
  notes?: string;
}
