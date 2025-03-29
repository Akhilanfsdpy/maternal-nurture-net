
export interface Message {
  id: number;
  text: string;
  isUser: boolean;
  attachments?: { type: 'video' | 'article' | 'growth' | 'image' | 'ai'; data: any }[];
}
