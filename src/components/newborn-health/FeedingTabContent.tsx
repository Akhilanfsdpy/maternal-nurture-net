
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const FeedingTabContent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feeding Tracker</CardTitle>
        <CardDescription>Monitor your baby's feeding patterns and nutrition</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Content for the feeding tab would go here.</p>
      </CardContent>
    </Card>
  );
};

export default FeedingTabContent;
