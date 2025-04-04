
import React, { ReactNode } from 'react';
import { TabsContent } from '@/components/ui/tabs';
import { useIsMobile } from '@/hooks/use-mobile';

export interface TabItem {
  value: string;
  content: ReactNode;
}

interface ReusableTabContentProps {
  tabs: TabItem[];
  activeTab?: string;
}

const ReusableTabContent: React.FC<ReusableTabContentProps> = ({ tabs, activeTab }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={isMobile ? "responsive-full-width-xs" : ""}>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabsContent>
      ))}
    </div>
  );
};

export default ReusableTabContent;
