
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

const NutritionTabContent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Nutrition Management</CardTitle>
        <CardDescription>Track diet and nutritional intake</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">Content for the nutrition tab would go here.</p>
      </CardContent>
    </Card>
  );
};

export default NutritionTabContent;
