
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const SymptomsTabContent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Symptom Tracking</CardTitle>
        <CardDescription>Monitor and record symptoms throughout your pregnancy</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Content for the symptoms tab would go here.</p>
      </CardContent>
    </Card>
  );
};

export default SymptomsTabContent;
