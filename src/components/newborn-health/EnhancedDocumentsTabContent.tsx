
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { FileText, Shield } from 'lucide-react';
import EnhancedDocumentVerification from './document-verification/EnhancedDocumentVerification';
import EnhancedDocumentScanner from './document-scanner/EnhancedDocumentScanner';

const EnhancedDocumentsTabContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("scanner");
  
  return (
    <Card className="p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex justify-center mb-6">
          <TabsList>
            <TabsTrigger value="scanner" className="flex items-center">
              <FileText className="w-4 h-4 mr-2" />
              Document Scanner
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center">
              <Shield className="w-4 h-4 mr-2" />
              Document Verification
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="scanner">
          <EnhancedDocumentScanner />
        </TabsContent>
        
        <TabsContent value="verification">
          <EnhancedDocumentVerification />
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default EnhancedDocumentsTabContent;
