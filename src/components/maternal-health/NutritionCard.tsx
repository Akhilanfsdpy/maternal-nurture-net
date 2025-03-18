
import React from 'react';
import { Utensils, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const nutritionData = [
  { name: 'Protein', value: 85, target: 70, unit: 'g' },
  { name: 'Iron', value: 18, target: 27, unit: 'mg' },
  { name: 'Calcium', value: 900, target: 1000, unit: 'mg' },
  { name: 'Folate', value: 580, target: 600, unit: 'mcg' },
  { name: 'Water', value: 2.4, target: 3, unit: 'L' },
];

const NutritionCard: React.FC = () => {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Utensils className="mr-2 h-5 w-5 text-health-blue" />
          Nutrition
        </CardTitle>
        <CardDescription>Daily nutrient intake</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {nutritionData.map((nutrient) => {
            const percentage = Math.min(100, (nutrient.value / nutrient.target) * 100);
            return (
              <div key={nutrient.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{nutrient.name}</span>
                  <span className="text-sm text-gray-500">
                    {nutrient.value} / {nutrient.target} {nutrient.unit}
                  </span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      percentage >= 100 ? "bg-emerald-500" : 
                      percentage >= 75 ? "bg-health-blue" : 
                      percentage >= 50 ? "bg-amber-500" : 
                      "bg-red-500"
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Log Meal
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NutritionCard;
